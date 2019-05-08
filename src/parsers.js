import yaml from 'js-yaml';

export default (data, extname) => {
  if (extname === '.json') {
    return JSON.parse(data);
  } // else if (extname === '.yml') {
  return yaml.safeLoad(data);
//  }
};
