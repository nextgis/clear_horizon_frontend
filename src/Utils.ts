export function fixUrlStr(url: string): string {
  // remove double slash
  return url.replace(/([^:]\/)\/+/g, '$1');
}

export function objToUrlStr(obj: { [param: string]: any }): string {
  let str = '';
  for (const key in obj) {
    if (str !== '') {
      str += '&';
    }
    str += key + '=' + encodeURIComponent(obj[key]);
  }
  return str;
}

function isValidUrl(str: string): boolean {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(str);
}

export function prepareColumnValue(value: unknown): unknown | string {
  if (typeof value === 'string') {
    if (isValidUrl(value)) {
      return `<a href="${value}" target="_blank">${value}</a>`;
    }
  }
  return value;
}
