export function apiUrl(path) {
  let _server = ''
  _server = '/api'
  // _server = '//apipre.adbaitai.com'
  // const _server = '//192.168.10.234:8080'
  // const _server = '//rap.taobao.org/mockjsdata/15637'
  return _server + path;
}
