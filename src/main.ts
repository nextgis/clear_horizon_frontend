import { App, AppOptions } from './App';
import NgwMap from '@nextgis/ngw-map';

let config: AppOptions = {};
try {
  config = require('../cfg.json');
} catch (er) {
  console.warn('Config file is not funded, run with default settings');
}


const OPTIONS: AppOptions = {
  mapOptions: {
    target: 'map',
    qmsId: 487,
    bounds: [36.59, 43.385, 49.374, 50.214]
  }
};
const options = NgwMap.utils.deepmerge(OPTIONS, config);
const app = new App(options);

app.create();



