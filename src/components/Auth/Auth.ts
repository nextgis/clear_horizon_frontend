import './Auth.css';

import NgwConnector from '@nextgis/ngw-connector';
import Dialog from '@nextgis/dialog';
import { NgwMapOptions } from '@nextgis/ngw-map';

export interface Credentials {
  login: string;
  password: string;
}

export class Auth {
  readonly connector: NgwConnector;
  private readonly _storageKey = 'auth';
  private readonly _storage = localStorage;
  private _errorMessage: string;
  private auth: Credentials;

  constructor(options: NgwMapOptions) {
    this.connector = new NgwConnector({ baseUrl: options.baseUrl, auth: options.auth });
    const auth = this._storage.getItem(this._storageKey);
    if (auth) {
      this.auth = JSON.parse(auth);
    }
  }

  async login(credentials?: Credentials) {
    this._errorMessage = '';
    if (!credentials) {
      credentials = await this.getAuth();
    }
    try {
      await this.connector.login(credentials);
      const user = this.connector.user;
      if (user) {
        if (user.keyname === 'guest') {
          throw new Error();
        }
      } else {
        throw new Error();
      }
    } catch (er) {
      this._errorMessage = 'Не удаётся войти';
      const auth = await this._showLoginDialog(credentials);
      await this.login(auth);
    }
    if (this.connector.getUserInfo) {
      this._storage.setItem(this._storageKey, JSON.stringify(credentials));
    }
  }

  logout() {
    this.connector.logout();
    this._storage.setItem(this._storageKey, '');
    this._errorMessage = '';
  }

  async getAuth() {
    const auth = await this._showLoginDialog(this.auth);
    return auth;
  }

  private _showLoginDialog(defAuth?: Credentials): Promise<Credentials> {
    return new Promise((resolve, reject) => {
      const dialog = new Dialog();
      const onResolve = (auth: Credentials) => {
        dialog.close();
        resolve(auth);
      };
      const onReject = (er: Error) => {
        dialog.close();
        reject(er);
      };
      const html = this._createDialogHtml(defAuth, onResolve, onReject);
      dialog.updateContent(html);
      dialog.show();
    });
  }

  private _createDialogHtml(
    defAuth: Credentials = { login: '', password: '' },
    resolve,
    reject
  ): HTMLElement {
    const { login, password } = defAuth;
    const form = document.createElement('div');
    form.className = 'dialog--form login';
    const formHtml = `
      <div><label><div>Имя пользователя:</div>
        <input value="${login}" class="dialog--input name"></input>
      </label></div>
      <div><label><div>Пароль:</div>
        <input value="${password}" type="password" class="dialog--input password"></input>
      </label></div>
      <div class="dialog-error"></div>
      <button class="dialog--button accept">Войти</button>
      <button class="dialog--button cancel">Отмена</button>
    `;
    form.innerHTML = formHtml;
    const loginElement = form.getElementsByClassName('name')[0] as HTMLInputElement;
    const passwordElement = form.getElementsByClassName('password')[0] as HTMLInputElement;
    if (this._errorMessage) {
      const errorMessageElement = form.getElementsByClassName(
        'dialog-error'
      )[0] as HTMLButtonElement;
      errorMessageElement.className = 'dialog-error';
      errorMessageElement.innerHTML = `<div class="dialog-error--message">${this._errorMessage}</div>`;
    }

    const loginBtn = form.getElementsByClassName('accept')[0] as HTMLButtonElement;
    const cancelBtn = form.getElementsByClassName('cancel')[0] as HTMLButtonElement;
    const getAuthOpt: () => Credentials = () => {
      return {
        login: loginElement.value,
        password: passwordElement.value
      };
    };
    const validate = () => {
      const auth = getAuthOpt();
      loginBtn.disabled = !(auth.login && auth.password);
    };
    const onInputChange = () => {
      validate();
    };
    const addEventListener = () => {
      [loginElement, passwordElement].forEach(x => {
        ['change', 'input'].forEach(y => x.addEventListener(y, onInputChange));
      });
    };
    const removeEventListener = () => {
      [loginElement, passwordElement].forEach(x => {
        ['change', 'input'].forEach(y => x.removeEventListener(y, onInputChange));
      });
    };
    loginBtn.onclick = () => {
      removeEventListener();
      resolve(getAuthOpt());
    };
    cancelBtn.onclick = () => {
      removeEventListener();
      reject('Login cancel');
    };
    validate();
    addEventListener();
    return form;
  }
}
