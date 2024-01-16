import { ActionMap } from './components/ActionMap';

import './bulma';
import type { AppOptions } from './interfaces';

export class App {
  actionMap: ActionMap;

  constructor(public options: Partial<AppOptions> = {}) {
    this.actionMap = new ActionMap(options);
  }

  async create(options?: AppOptions): Promise<void> {
    this.options = { ...this.options, ...options };
    // show app html after js and css loading and before map drawing start
    this.showContent();
    await this.actionMap.create(this.options);
  }

  showContent(): void {
    const appContent = document.getElementById('app');
    const appLoadingContent = document.getElementById('app-loading');
    if (appLoadingContent) {
      appLoadingContent.style.display = 'none';
    }
    if (appContent) {
      appContent.style.display = 'block';
    }
  }
}
