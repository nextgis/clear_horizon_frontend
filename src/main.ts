import 'core-js';
import 'regenerator-runtime/runtime';
import { deepmerge } from '@nextgis/utils';
import { App, AppOptions } from './App';

import './style/style.scss';

let config: AppOptions = {};
try {
  config = require('../config').default;
} catch (er) {
  console.warn('Config file is not funded, run with default settings');
}

const OPTIONS: AppOptions = {
  mapOptions: {
    target: 'map',
    bounds: [36.59, 43.385, 49.374, 50.214],
  },
  timedelta: 24,
};
const options = deepmerge(OPTIONS, config);
const app = new App(options);

app.create();
