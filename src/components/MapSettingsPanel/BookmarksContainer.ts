import './BookmarksContainer.css';

import { Bookmark } from 'src/App';
import NgwMap from '@nextgis/ngw-map';
import { ResourceHierarchy, FeatureItem } from '@nextgis/ngw-connector';
import { GeoJSON, Map } from 'leaflet';
import { Polygon } from 'geojson';

export interface BookmarksContainerOptions {
  ngwMap: NgwMap;
  bookmarks: ResourceHierarchy[];
}

export class BookmarksContainer {
  private readonly ngwMap: NgwMap<Map>;
  private _container: HTMLElement;

  constructor(private options: BookmarksContainerOptions) {
    this.ngwMap = options.ngwMap;
    this._container = this._createContainer();
  }

  getContainer(): HTMLElement {
    return this._container;
  }

  _createContainer(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'bookmarks-contentainer panel-content-padding ';

    const bookmarksContainer = document.createElement('div');
    bookmarksContainer.className = 'bookmarks-contentainer__layers';
    this.options.bookmarks.forEach((b) => {
      this.ngwMap.connector
        .get('resource.item', null, { id: b.id })
        .then((resource) => {
          const labelField = resource.feature_layer.fields.find(
            (x) => x.label_field
          );
          this.ngwMap.getNgwLayerItems({ resourceId: b.id }).then((items) => {
            items.forEach((x: FeatureItem<Bookmark, Polygon>) => {
              const elem = this._createBookmarkItem(x, labelField.keyname);
              container.appendChild(elem);
            });
          });
        });
    });
    container.appendChild(bookmarksContainer);

    return container;
  }

  _createBookmarkItem(
    bookmark: FeatureItem<Bookmark, Polygon>,
    nameField = 'name'
  ): HTMLElement {
    const elem = document.createElement('div');
    elem.className = 'tree-container__item bookmark';
    const bookmarkBlock = document.createElement('div');
    bookmarkBlock.innerHTML = bookmark.fields[nameField];
    bookmarkBlock.onclick = () => {
      const geoJson = new GeoJSON(bookmark.geom);
      const lMap = this.ngwMap.mapAdapter.map;
      lMap.fitBounds(geoJson.getBounds());
    };
    elem.appendChild(bookmarkBlock);
    return elem;
  }
}
