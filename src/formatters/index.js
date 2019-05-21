import renderTree from './renderTree';
import renderPlain from './renderPlain';

export default (ast, format) => {
  if (format === 'plain') {
    return renderPlain(ast);
  }
  if (format === 'json') {
    return JSON.stringify(ast);
  }
  return renderTree(ast);
};
