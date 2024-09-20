import yaml from 'js-yaml';
import parseIni from './parseIni.js';

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
  ini: parseIni,
};

export default (extName, rawData) => {
  if (parsers[extName]) {
    return parsers[extName](rawData);
  }

  throw Error(`unknow type ${extName}`);
};
