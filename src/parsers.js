import yaml from 'js-yaml';
import ini from 'ini';

const renders = { '.json': JSON.parse, '.yml': yaml.safeLoad, '.ini': ini.parse };

export default format => renders[format];
