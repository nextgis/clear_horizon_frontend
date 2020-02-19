import bulmaCarousel from 'bulma-carousel';
import NgwMap from '@nextgis/ngw-map';
import { Feature, Geometry } from 'geojson';
import { FeatureItemAttachment, ResourceItem } from '@nextgis/ngw-connector';
import { prepareColumnValue } from '../Utils';

interface CollectorDate {
  year: number;
  month: number;
  day: number;
}
interface CollectorTime {
  hour: number;
  minute: number;
  second: number;
}

type CollectorProperty = string | number | CollectorDate | CollectorTime;

interface FunctionArg {
  argType: 'function';
  body: string;
}

interface WebMapRemote {
  type: 'webmap_remote';
  cmd: string;
  args?: Array<any | FunctionArg>;
}

export class Popup {
  private _resourceItems: { [resourceId: number]: ResourceItem } = {};

  constructor(private ngwMap: NgwMap) {}

  setNgwMap(ngwMap: NgwMap) {
    this.ngwMap = ngwMap;
  }

  createPopupContent<G extends Geometry = any, P = any>(
    feature: Feature<G, P>,
    resourceId?: number
  ): HTMLElement {
    const popupElement = document.createElement('div');
    const properties = document.createElement('div');
    properties.className = 'properties';
    const propertiesList = Object.keys(feature.properties).map(k => {
      return {
        key: k,
        value: feature.properties[k]
      };
    });
    properties.innerHTML = this.createPropertiesHtml(propertiesList);

    if (resourceId) {
      const pre = document.createElement('div');
      pre.appendChild(properties);
      popupElement.innerHTML = 'Загрузка';
      this.updateElementContent(pre, resourceId, feature).then(() => {
        popupElement.innerHTML = '';
        popupElement.appendChild(pre);
      });
    } else {
      popupElement.appendChild(properties);
    }
    return popupElement;
  }

  createPropertiesHtml(
    properties: Array<{ key: string; value: CollectorProperty }>
  ) {
    let elem = '';
    properties.forEach(({ key, value }) => {
      if (typeof value === 'object' && value) {
        if ('year' in value) {
          value = [value.day, value.month, value.year].join('.');
        } else if ('hour' in value) {
          value = [value.hour, value.minute].join(':');
        }
      }
      elem += `
      <div class="columns is-mobile">
        <div class="column is-two-fifths">${key}</div>
        <div class="column">${prepareColumnValue(value)}</div>
      </div>
      `;
    });
    return elem;
  }

  async updateElementContent<G extends Geometry = any, P = any>(
    element: HTMLElement,
    resourceId: number,
    feature: Feature<G, P>
  ) {
    const item = await this._getResourceItem(resourceId);
    if (item.feature_layer) {
      const newProperties = [];
      item.feature_layer.fields.forEach(x => {
        if (x.grid_visibility) {
          const property = feature.properties[x.keyname];
          if (property) {
            newProperties.push({ key: x.display_name, value: property });
          }
        }
      });
      const newContent = this.createPropertiesHtml(newProperties);
      const pre = element.getElementsByClassName('properties')[0];
      if (pre) {
        pre.innerHTML = newContent;
      }
    }
    return item;
  }

  async _addPhotos(
    element: HTMLElement,
    attachment: FeatureItemAttachment[],
    id: number,
    fid: number
  ) {
    const attachmentElement = document.createElement('div');

    attachmentElement.className = 'carousel attachment';
    for (const img of attachment) {
      const width = 300;
      const height = 300;
      const figure = document.createElement('figure');
      figure.className = `image is-${width}x${height}`;
      const src = await this._loadImage(img, {
        width,
        height,
        id,
        fid
      });
      const imgElem = document.createElement('img');
      imgElem.src = src;
      figure.appendChild(imgElem);
      attachmentElement.appendChild(figure);
    }
    element.appendChild(attachmentElement);
    bulmaCarousel.attach(attachmentElement);
  }

  private async _getResourceItem(resourceId: number) {
    if (!this._resourceItems[resourceId]) {
      const item = await this.ngwMap.connector.get('resource.item', null, {
        id: resourceId
      });
      this._resourceItems[resourceId] = item;
    }
    return this._resourceItems[resourceId];
  }

  private _loadImage(
    img: FeatureItemAttachment,
    options: { id: number; fid: number; width?: number; height?: number }
  ) {
    return new Promise<string>((resolve, reject) => {
      const { width, height } = options;
      const url =
        '/api/resource/' +
        options.id +
        '/feature/' +
        options.fid +
        `/attachment/${img.id}/image` +
        (width && height ? `?size=${width}x${height}` : '');
      this.ngwMap.connector
        .makeQuery(url, {}, { responseType: 'blob' })
        .then(blob => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
        })
        .catch(er => {
          reject(er);
        });
    });
  }
}
