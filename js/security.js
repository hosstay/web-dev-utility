const cryptoJs = require('crypto-js');
const pako     = require('pako');

function encrypt(object) {
  let outbound = pako.deflate(JSON.stringify(object), {to: 'string'});
  outbound = (cryptoJs.AES.encrypt(outbound, '1234')).toString();
  return outbound;
}

function decrypt(data) {
  let result = (cryptoJs.AES.decrypt(data, '1234').toString(cryptoJs.enc.Utf8));
  result = JSON.parse(pako.inflate(result, {to: 'string'}));
  return result;
}

export {
  encrypt,
  decrypt
};