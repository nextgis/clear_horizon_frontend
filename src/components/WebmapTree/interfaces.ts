import { NgwLayers } from '@nextgis/ngw-map';

export interface WebmapTreeOptions {
  target?: HTMLElement | string;
  width?: number;
  status?: boolean;

  ngwLayers?: NgwLayers;
}
