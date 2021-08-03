import { EventEmitter } from 'events';
import { create } from '@nextgis/dom';
import { treeFind } from '@nextgis/tree';

import type StrictEventEmitter from 'strict-event-emitter-types';
import type { MapAdapter, MapControl } from '@nextgis/webmap';
import type { SidebarControlEvents, SidebarControlOptions } from './interfaces';

export class SidebarControl implements MapControl {
  readonly emitter: StrictEventEmitter<EventEmitter, SidebarControlEvents> =
    new EventEmitter();

  options: SidebarControlOptions = {
    closeButton: true,
    position: 'left',
    autoPan: true,
  };

  private _visible = true;
  private _container: HTMLElement;
  private _contentContainer?: HTMLElement;
  private _closeButton?: HTMLElement;
  private _map?: MapAdapter;

  constructor(
    placeholder: HTMLElement | string,
    options: SidebarControlOptions,
  ) {
    Object.assign(this.options, options);

    const l = 'webmap-';

    // Create sidebar container
    const container = create('div', l + 'sidebar ' + this.options.position);
    this._container = container;

    // Find content container
    let content: HTMLElement | null = null;
    if (typeof placeholder === 'string') {
      content = document.querySelector(placeholder);
    } else if (placeholder instanceof HTMLElement) {
      content = placeholder;
    }
    if (content) {
      this._contentContainer = content;
      // Remove the content container from its original parent
      if (content.parentNode) {
        content.parentNode.removeChild(content);
      }
    } else {
      throw new Error(
        'placeholder option is required for create SidebarControl',
      );
    }

    // Style and attach content container
    content?.classList.add(l + 'control');

    container.appendChild(content);

    // Create close button and attach it if configured
    if (this.options.closeButton) {
      const close = create('a', 'close', container);
      this._closeButton = close;
      close.innerHTML = '&times;';
    }
  }

  onAdd(map: MapAdapter): HTMLElement {
    const container = this._container;
    const content = this._contentContainer;

    // Attach event to close button
    if (this._closeButton) {
      this._closeButton.addEventListener('click', this.$hide);
    }

    container.addEventListener('transitionend', this.$handleTransitionEvent);
    container.addEventListener(
      'webkitTransitionEnd',
      this.$handleTransitionEvent,
    );

    // Attach sidebar container to controls container
    const controlContainer =
      map.getControlContainer && map.getControlContainer();
    if (controlContainer) {
      controlContainer.insertBefore(container, controlContainer.firstChild);
    }

    this._map = map;

    // Make sure we don't drag the map when we interact with the content
    const stop = this.$stop;
    if (content) {
      content.addEventListener('contextmenu', stop);
      content.addEventListener('click', stop);
      content.addEventListener('mousedown', stop);
      content.addEventListener('touchstart', stop);
      content.addEventListener('dblclick', stop);
      content.addEventListener('mousewheel', stop);
      content.addEventListener('MozMousePixelScroll', stop);
    }
    return container;
  }

  onRemove(): void {
    const map = this._map;
    if (!map) return;

    //if the control is visible, hide it before removing it.
    this.hide();

    const container = this._container;
    const content = this._contentContainer;

    // Remove sidebar container from controls container
    const controlContainer =
      map.getControlContainer && map.getControlContainer();
    if (controlContainer) {
      controlContainer.removeChild(container);
    }

    //disassociate the map object
    this._map = undefined;
    if (content) {
      // Unregister events to prevent memory leak
      const stop = this.$stop;

      content.removeEventListener('contextmenu', stop);
      content.removeEventListener('click', stop);
      content.removeEventListener('mousedown', stop);
      content.removeEventListener('touchstart', stop);
      content.removeEventListener('dblclick', stop);
      content.removeEventListener('mousewheel', stop);
      content.removeEventListener('MozMousePixelScroll', stop);
    }
    container.removeEventListener('transitionend', this.$handleTransitionEvent);
    container.removeEventListener(
      'webkitTransitionEnd',
      this.$handleTransitionEvent,
    );

    if (this._closeButton) {
      const close = this._closeButton;

      close.removeEventListener('click', this.$hide);
    }
  }

  isVisible(): boolean {
    return this._visible;
  }

  show(): void {
    if (!this.isVisible()) {
      this._getTopSideControlContainer().classList.add('visible');
      // if (this.options.autoPan) {
      //   this._map.panBy([-this.getOffset() / 2, 0], {
      //     duration: 0.5,
      //   });
      // }
      this.emitter.emit('show');
    }
    this._visible = true;
  }

  hide(e?: MouseEvent): void {
    if (this.isVisible()) {
      this._getTopSideControlContainer().classList.remove('visible');
      // if (this.options.autoPan) {
      //   this._map.panBy([this.getOffset() / 2, 0], {
      //     duration: 0.5,
      //   });
      // }
      this.emitter.emit('hide');
    }
    if (e) {
      e.stopPropagation();
    }
    this._visible = false;
  }

  toggle(): void {
    if (this.isVisible()) {
      this.hide();
    } else {
      this.show();
    }
  }

  getContainer(): HTMLElement {
    if (!this._contentContainer) {
      throw new Error('sidebar container has not been initialized yet');
    }
    return this._contentContainer;
  }

  getCloseButton(): HTMLElement {
    if (!this._closeButton) {
      throw new Error(
        'sidebar close button container has not been initialized yet',
      );
    }
    return this._closeButton;
  }

  setContent(content: string | HTMLElement): void {
    const container = this.getContainer();

    if (typeof content === 'string') {
      container.innerHTML = content;
    } else {
      // clean current content
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      container.appendChild(content);
    }
  }

  getOffset(): number {
    if (this.options.position === 'right') {
      return -this._container.offsetWidth;
    } else {
      return this._container.offsetWidth;
    }
  }

  private _getTopSideControlContainer(): HTMLElement {
    const topElement = treeFind(
      this._container,
      (x) => x.classList.contains('webmap-ctrl-' + this.options.position),
      (x) => x.parentNode as HTMLElement,
    );
    return topElement || this._container;
  }
  private $stop = (e: Event) => e.stopPropagation();
  private $hide = (e?: MouseEvent) => this.hide(e);
  private $handleTransitionEvent = (e: Event) => {
    this._handleTransitionEvent(e as TransitionEvent);
  };

  private _handleTransitionEvent(e: TransitionEvent) {
    if (e.propertyName === 'left' || e.propertyName === 'right')
      this.emitter.emit(this.isVisible() ? 'shown' : 'hidden');
  }
}
