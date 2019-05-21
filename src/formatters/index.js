import renderTree from './renderTree';
import renderPlain from './renderPlain';

export default (ast, format) => {
  switch (format) {
    case 'plain':
      return renderPlain(ast);
    case 'json':
      return JSON.stringify(ast);
    default:
      return renderTree(ast);
  }
};
