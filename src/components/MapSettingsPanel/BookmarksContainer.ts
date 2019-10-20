import { Bookmarks, Bookmark } from 'src/App';
import NgwMap from '@nextgis/ngw-map';
import { ResourceAdapter } from '@nextgis/ngw-kit';

export interface BookmarksContainerOptions {
  ngwMap: NgwMap;
  bookmarks: Bookmarks;
}

export class BookmarksContainer {
  private readonly ngwMap: NgwMap;
  private _container: HTMLElement;

  constructor(private options: BookmarksContainerOptions) {
    this.ngwMap = options.ngwMap;
    this._container = this._createContainer();
  }

  getContainer() {
    return this._container;
  }

  _createContainer() {
    const container = document.createElement('div');
    container.className = 'bookmarks-contentainer panel-content-padding ';

    const bookmarks = document.createElement('div');
    bookmarks.className = 'bookmarks-contentainer__layers';
    this.options.bookmarks.forEach(b => {
      this._createBookmarkItem(b, bookmarks);
    });
    container.appendChild(bookmarks);

    return container;
  }

  _createBookmarkItem(bookmark: Bookmark, container: HTMLElement) {
    const elem = document.createElement('div');
    elem.className = 'tree-container__item';
    const layer = this.ngwMap.getLayer(bookmark.id) as ResourceAdapter;
    const item = layer.item;
    const input = document.createElement('input');
    input.setAttribute('type', 'checkbox');

    input.checked = true;

    // visibility.emitter.on('change', (ev: CheckChangeEvent) => {
    //   input.checked = ev.value;
    // });
    input.onclick = () => {
      this.ngwMap.toggleLayer(bookmark.id, input.checked);
    };

    const name = document.createElement('span');

    const displayName = item.resource.display_name.split('__')[0];

    name.innerHTML = displayName.replace('bookmarks', '').trim();

    elem.appendChild(input);
    elem.appendChild(name);

    container.appendChild(elem);
  }
}
