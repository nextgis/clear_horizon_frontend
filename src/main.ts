import 'regenerator-runtime/runtime';

import { App } from './App';
import config from './config';

import './style/style.scss';

const app = new App(config);

app.create();
