// @ts-ignore
import bulmaCarousel from 'bulma-carousel';

import type {
  FeatureItemAttachment,
  ResourceItem,
} from '@nextgis/ngw-connector';
import type { Feature, Geometry } from 'geojson';

import { prepareColumnValue } from '../utils';
import { createSensorPopupContent } from '../utils/createSensorPopupContent';

import type { NgwMap } from '@nextgis/ngw-map';

import type { CreateExportPopupContentProps } from '../utils/createSensorPopupContent';
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

interface KeyValue {
  key: string;
  value: any;
}

type CollectorProperty = string | number | CollectorDate | CollectorTime;

export class Popup {
  private ngwMap!: NgwMap;
  private _resourceItems: { [resourceId: number]: ResourceItem } = {};

  setNgwMap(ngwMap: NgwMap): void {
    this.ngwMap = ngwMap;
  }

  async createSensorPopupContent(
    props: CreateExportPopupContentProps,
  ): Promise<HTMLElement> {
    return createSensorPopupContent(props);
  }

  createPopupContent<
    G extends Geometry = any,
    P extends Record<string, any> = Record<string, any>,
  >(
    feature: Feature<G, P>,
    resourceId?: number,
    attachment?: FeatureItemAttachment[],
  ): HTMLElement {
    const popupElement = document.createElement('div');
    const props = feature.properties;
    const propContainer = document.createElement('div');
    if (props) {
      propContainer.className = 'properties';
      const propertiesList: KeyValue[] = Object.entries(props).map(
        ([key, value]) => {
          return {
            key,
            value,
          };
        },
      );
      propContainer.innerHTML = this.createPropertiesHtml(propertiesList);
    }

    if (resourceId) {
      const pre = document.createElement('div');
      pre.appendChild(propContainer);
      popupElement.innerHTML = 'Загрузка';
      this.updateElementContent(pre, resourceId, feature).then(() => {
        popupElement.innerHTML = '';
        popupElement.appendChild(pre);
      });
      if (attachment && attachment.length) {
        this._addPhotos(
          popupElement,
          attachment,
          resourceId,
          Number(feature.id),
        );
      }
    } else {
      popupElement.appendChild(propContainer);
    }
    return popupElement;
  }

  createPropertiesHtml(
    properties: Array<{ key: string; value: CollectorProperty }>,
  ): string {
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

  async updateElementContent<
    G extends Geometry = any,
    P extends Record<string, any> = Record<string, any>,
  >(
    element: HTMLElement,
    resourceId: number,
    feature: Feature<G, P>,
  ): Promise<ResourceItem> {
    const item = await this._getResourceItem(resourceId);
    if (item.feature_layer) {
      const newProperties: KeyValue[] = [];
      item.feature_layer.fields.forEach((x) => {
        if (x.grid_visibility) {
          let property = feature.properties[x.keyname];
          if (property) {
            if (typeof property === 'string') {
              property = property.replace(/\w+(;)\w+/g, (a, b) =>
                a.replace(b, b + ' '),
              );
            }
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
    fid: number,
  ): Promise<void> {
    const attachmentElement = document.createElement('div');

    attachmentElement.className = 'carousel attachment';
    for (const img of attachment) {
      const width = 300;
      const height = 300;
      const figure = document.createElement('figure');
      figure.className = `image is-${width}x${height}`;
      figure.style.maxHeight = height + 'px';
      figure.style.maxWidth = width + 'px';
      const src = await this._loadImage(img, {
        width,
        height,
        id,
        fid,
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
        id: resourceId,
      });
      this._resourceItems[resourceId] = item;
    }
    return this._resourceItems[resourceId];
  }

  private _loadImage(
    img: FeatureItemAttachment,
    options: { id: number; fid: number; width?: number; height?: number },
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
        .makeQuery<Blob>(url, {}, { responseType: 'blob' })
        .then((blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
        })
        .catch((er) => {
          reject(er);
        });
    });
  }
}
