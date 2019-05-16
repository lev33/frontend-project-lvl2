import yaml from 'js-yaml';
import ini from 'ini';

export default (content) => {
  if (content.key === '.json') {
    return JSON.parse(content.value);
  }
  if (content.key === '.yml') {
    return yaml.safeLoad(content.value);
  } // else if (content.key === '.ini') {
  return ini.parse(content.value);
//  }
};
