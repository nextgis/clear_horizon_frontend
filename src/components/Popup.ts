// @ts-ignore
import bulmaCarousel from 'bulma-carousel';
import { NgwMap } from '@nextgis/ngw-map';
import { Feature, Geometry } from 'geojson';
import { FeatureItemAttachment } from '@nextgis/ngw-connector';
import { prepareColumnValue } from '../utils';

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

  setNgwMap(ngwMap: NgwMap): void {
    this.ngwMap = ngwMap;
  }

  createPopupContent<G extends Geometry = any, P = Record<string, any>>(
    feature: Feature<G, P>,
    resourceId?: number,
    attachment?: FeatureItemAttachment[],
  ): HTMLElement {
    const popupElement = document.createElement('div');
    popupElement.className = 'columns';
    popupElement.style.minWidth = '300px';
    popupElement.style.maxWidth = '700px';

    const properties = document.createElement('div');

    properties.style.maxHeight = '300px';
    properties.style.maxWidth = '350px';
    properties.style.overflow = 'auto';

    properties.className = 'column properties';

    if (resourceId) {
      popupElement.innerHTML = 'Загрузка';
      this.getPropertiesContent(resourceId, feature).then((inner) => {
        popupElement.innerHTML = '';
        if (inner) {
          properties.innerHTML = inner;
        }
        popupElement.appendChild(properties);
      });

      if (attachment && attachment.length) {
        this._addPhotos(
          popupElement,
          attachment,
          resourceId,
          Number(feature.id),
        );
      }
    }

    return popupElement;
  }

  createPropertiesHtml(
    properties: Array<{ key: string; value: CollectorProperty }>,
  ): string {
    let elem = '<table class="table"><tbody>';
    for (const { key, value } of properties) {
      let val = String(value);
      if (typeof value === 'object' && value) {
        if ('year' in value) {
          val = [value.day, value.month, value.year].join('.');
        } else if ('hour' in value) {
          val = [value.hour, value.minute].join(':');
        }
      }
      elem += `
      <tr>
        <th>${key}</th>
        <td>${prepareColumnValue(val)}</td>
      </tr>
      `;
    }
    elem += '</tbody></table>';
    return elem;
  }

  async getPropertiesContent<
    G extends Geometry = any,
    P extends Record<string, any> = Record<string, any>,
  >(resourceId: number, feature: Feature<G, P>): Promise<string | undefined> {
    const item = await this.ngwMap.connector.getResource(resourceId);
    if (item && item.feature_layer) {
      const newProperties: KeyValue[] = [];
      item.feature_layer.fields.forEach((x) => {
        if (x.grid_visibility) {
          const property = feature.properties[x.keyname];
          if (property) {
            newProperties.push({ key: x.display_name, value: property });
          }
        }
      });
      return this.createPropertiesHtml(newProperties);
    }
  }

  async _addPhotos(
    element: HTMLElement,
    attachment: FeatureItemAttachment[],
    id: number,
    fid: number,
  ): Promise<void> {
    const attachmentElement = document.createElement('div');
    attachmentElement.style.width = '300px';
    attachmentElement.className = 'column carousel attachment';
    for (const img of attachment) {
      const width = 350;
      const height = 350;
      const figure = document.createElement('figure');
      figure.className = `image`;
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
    bulmaCarousel.attach(attachmentElement, { slidesToShow: 1 });
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
        .makeQuery(url, {}, { responseType: 'blob' })
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
