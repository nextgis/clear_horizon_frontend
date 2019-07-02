import './CollapsiblePanel.css';

type GetHTML = () => HTMLElement;

export interface CollapsiblePanelOptions {
  title?: string;
  content: HTMLElement | GetHTML;
  open?: boolean;
  parent?: HTMLElement;
}

export class CollapsiblePanel {

  private readonly _container = document.createElement('div');
  private _content: HTMLElement;
  private _toggle?: HTMLElement;
  private status: boolean;

  constructor(private options: CollapsiblePanelOptions) {
    this.status = this.options.open !== undefined ? this.options.open : true;
    this._updateContainer();
    if (this.options.parent) {
      this.options.parent.appendChild(this.getContainer());
    }
  }

  getContainer() {
    return this._container;
  }

  open() {
    if (!this._content) {
      this._createContent();
    }
    this._container.appendChild(this._content);
    if (this._toggle) {
      this._toggle.innerHTML = '&times;';
    }
    this.status = true;
  }

  close() {
    if (this._content) {
      this._content.parentNode.removeChild(this._content);
    }
    if (this._toggle) {
      this._toggle.innerHTML = '>>';
    }
    this.status = false;
  }

  toggle() {
    if (this.status) {
      this.close();
    } else {
      this.open();
    }
  }

  _updateContainer() {
    this._container.innerHTML = '';
    if (this.options.title) {
      const header = this._createHeader();
      this._container.appendChild(header);
    }
    if (this.status) {
      this.open();
    } else {
      this.close();
    }
  }

  _createHeader() {
    const header = document.createElement('div');
    header.className = 'panel-header';

    const title = document.createElement('div');
    title.className = 'panel-header__title';
    title.innerHTML = this.options.title;

    const toggle = document.createElement('div');
    toggle.className = 'panel-header__toggle';

    toggle.onclick = () => { this.toggle(); };
    this._toggle = toggle;

    header.appendChild(toggle);

    header.appendChild(title);

    return header;
  }

  _createContent() {
    const content = document.createElement('div');
    content.className = 'panel-content';
    const html = (typeof this.options.content === 'function') ?
      this.options.content()
      :
      this.options.content;
    content.appendChild(html);
    this._content = content;
    return content;
  }
}
