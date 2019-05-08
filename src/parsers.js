import yaml from 'js-yaml';
import ini from 'ini';

export default (data, extname) => {
  if (extname === '.json') {
    return JSON.parse(data);
  }
  if (extname === '.yml') {
    return yaml.safeLoad(data);
  } // else if (extname === '.ini') {
  return ini.parse(data);
//  }
};
