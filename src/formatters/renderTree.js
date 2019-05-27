import _ from 'lodash';

const render = (tree, tab = 1) => {
  const space = tabs => ' '.repeat(tabs * 2);

  const stringify = (a, tabs) => {
    if (!(a instanceof Object)) {
      return a;
    }
    const openingSpaces = space(tabs + 2);
    const closingSpaces = space(tabs);
    return `{\n${openingSpaces}${Object.keys(a)}: ${Object.values(a)}\n${closingSpaces}}`;
  };


  const result = tree.map((item) => {
    switch (item.type) {
      case 'removed':
        return `${space(tab)}- ${item.key}: ${stringify(item.value, tab)}`;
      case 'added':
        return `${space(tab)}+ ${item.key}: ${stringify(item.value, tab)}`;
      case 'unchanged':
        return `${space(tab)}  ${item.key}: ${stringify(item.value, tab)}`;
      case 'changed':
        return [
          `${space(tab)}- ${item.key}: ${stringify(item.oldValue, tab)}`,
          `${space(tab)}+ ${item.key}: ${stringify(item.newValue, tab)}`,
        ];
      case 'children':
        return `${space(tab)}  ${item.key}: {\n${render(item.children, tab + 2)}\n${space(tab)}}`;
      default:
        throw new Error('renderTree missing selector');
    }
  });

  return _.flatten(result).join('\n');
};

const renderTree = tree => `{\n${render(tree)}\n}`;

export default renderTree;
