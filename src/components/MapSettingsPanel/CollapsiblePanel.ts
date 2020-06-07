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

  getContainer(): HTMLElement {
    return this._container;
  }

  open(): void {
    if (!this._content.innerHTML) {
      this._updateContent();
    }
    // this._container.appendChild(this._content);
    if (this._toggle) {
      this._toggle.innerHTML = this._getToggleButtonHtml('fas fa-chevron-up');
    }
    this.status = true;
  }

  close(): void {
    this._cleanContent();
    if (this._toggle) {
      this._toggle.innerHTML = this._getToggleButtonHtml('fas fa-chevron-down');
    }
    this.status = false;
  }

  toggle(): void {
    if (this.status) {
      this.close();
    } else {
      this.open();
    }
  }

  private _getToggleButtonHtml(icon?: string) {
    return `
    <a class="button is-small">
    <span class="icon is-small">
      <i class="${icon}"></i>
    </span>
    </a>
    `;
  }

  private _updateContainer() {
    this._container.innerHTML = '';
    if (this.options.title) {
      const header = this._createHeader();
      this._container.appendChild(header);
    }
    const content = document.createElement('div');
    content.className = 'panel-content';
    this._content = content;
    this._container.appendChild(content);

    if (this.status) {
      this.open();
    } else {
      this.close();
    }
  }

  private _createHeader() {
    const header = document.createElement('div');
    header.className = 'level is-mobile panel-header';

    const leftLevel = document.createElement('div');
    leftLevel.className = 'level-left';

    const title = document.createElement('div');
    title.className = 'level-item panel-header__title';
    title.innerHTML = this.options.title;
    leftLevel.appendChild(title);

    const rightLevel = document.createElement('div');
    rightLevel.className = 'level-right';
    const toggle = document.createElement('div');
    toggle.className = 'level-item panel-header__toggle';
    rightLevel.appendChild(toggle);

    toggle.onclick = () => {
      this.toggle();
    };
    this._toggle = toggle;

    header.appendChild(leftLevel);
    header.appendChild(rightLevel);

    return header;
  }

  private _cleanContent() {
    this._content.innerHTML = '';
  }

  private _updateContent() {
    this._cleanContent();
    const html =
      typeof this.options.content === 'function'
        ? this.options.content()
        : this.options.content;

    this._content.appendChild(html);
    return this._content;
  }
}
