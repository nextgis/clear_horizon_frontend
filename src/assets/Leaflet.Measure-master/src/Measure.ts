import { Control, DomUtil, DomEvent, Util } from 'leaflet';
import { I18N } from './i18n';
import { MeasureAction } from './MeasureAction';

import type { Map, Handler } from 'leaflet';
import type { MeasureOptions } from './interfaces';

export class Measure extends Control {
  options: MeasureOptions = {
    position: 'topright',
    title: 'Measurement',
    collapsed: true,
    color: '#FF0080',
    locale: 'en',
    messages: I18N['en'],
  };

  private _map?: Map;
  private _container?: HTMLElement;
  private _link?: HTMLLinkElement;
  private _contents?: HTMLElement;
  private _measureHandler?: Handler;

  constructor(options: Partial<MeasureOptions>) {
    super(options);
    Util.setOptions(this, options);
    const locale = options.locale;
    if (locale && locale !== 'en') {
      const messages = I18N[locale];
      if (messages) {
        this.options.messages = { ...I18N, ...messages };
      } else {
        console.error(
          'Measure control has no messages for ' +
            this.options.locale +
            ' locale',
        );
      }
    }
  }
  onAdd(map: Map): HTMLElement {
    this._map = map;
    return this._container || this._initLayout();
  }
  disableMeasure(): void {
    if (this._measureHandler) {
      this._measureHandler.disable();
      this._measureHandler = undefined;
    }
  }
  private _buildContainer(): HTMLElement {
    this._container = DomUtil.create(
      'div',
      'leaflet-control-measure leaflet-bar leaflet-control',
    );

    this._contents = DomUtil.create(
      'div',
      'leaflet-measure-contents',
      this._container,
    );

    this._link = DomUtil.create(
      'a',
      'leaflet-measure-toggle',
      this._container,
    ) as HTMLLinkElement;
    this._link.title = this.options.title || 'Measurement';
    this._link.href = '#';

    // if (this.options.title) {
    //   var title = DomUtil.create('h3', '', this._contents);
    //   title.innerText = this.options.title;
    // }

    this._buildItems();
    return this._container;
  }
  private _buildItems(): void {
    const ele_ul = DomUtil.create(
      'ul',
      'leaflet-measure-actions',
      this._contents,
    );
    let ele_li = DomUtil.create('li', 'leaflet-measure-action', ele_ul);
    const ele_link_line = DomUtil.create(
      'a',
      'start',
      ele_li,
    ) as HTMLLinkElement;
    ele_link_line.innerText = this.options.messages.linearMeasurement;
    ele_link_line.href = '#';
    DomEvent.disableClickPropagation(ele_link_line);
    DomEvent.on(ele_link_line, 'click', this._enableMeasureLine, this);

    ele_li = DomUtil.create('li', 'leaflet-measure-action', ele_ul);
    const ele_link_area = DomUtil.create(
      'a',
      'leaflet-measure-action start',
      ele_li,
    ) as HTMLLinkElement;
    ele_link_area.innerText = this.options.messages.areaMeasurement;
    ele_link_area.href = '#';
    DomEvent.disableClickPropagation(ele_link_area);
    DomEvent.on(ele_link_area, 'click', this._enableMeasureArea, this);
  }
  private _initLayout(): HTMLElement {
    const container = this._buildContainer();
    DomEvent.disableClickPropagation(container);
    DomEvent.disableScrollPropagation(container);
    if (this.options.collapsed) {
      DomEvent.on(
        container,
        {
          mouseenter: this._expand,
          mouseleave: this._collapse,
        },
        this,
      );
    } else {
      this._expand();
    }
    return container;
  }
  private _enableMeasureLine(ev: Event): void {
    DomEvent.stopPropagation(ev);
    this.disableMeasure();
    if (this._map) {
      this._measureHandler = new MeasureAction(this._map, {
        model: 'distance',
        color: this.options.color,
        messages: this.options.messages,
      });
      this._measureHandler.enable();
    }
  }
  private _enableMeasureArea(ev: Event): void {
    DomEvent.stopPropagation(ev);
    this.disableMeasure();
    if (this._map) {
      this._measureHandler = new MeasureAction(this._map, {
        model: 'area',
        color: this.options.color,
        messages: this.options.messages,
      });
      this._measureHandler.enable();
    }
  }
  private _expand(): this {
    if (this._link && this._container) {
      this._link.style.display = 'none';
      DomUtil.addClass(this._container, 'leaflet-measure-expanded');
    }
    return this;
  }
  private _collapse(): this {
    if (this._link && this._container) {
      this._link.style.display = 'block';
      DomUtil.removeClass(this._container, 'leaflet-measure-expanded');
    }
    return this;
  }
}
