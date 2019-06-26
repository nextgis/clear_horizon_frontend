export function fixUrlStr(url: string) {
  // remove double slash
  return url.replace(/([^:]\/)\/+/g, '$1');
}

export function objToUrlStr(obj: { [param: string]: any }) {
  let str = '';
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (str !== '') {
        str += '&';
      }
      str += key + '=' + encodeURIComponent(obj[key]);
    }
  }
  return str;
}
