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
        return `${space(tab)}- ${item.key}: ${stringify(item.oldValue, tab)}\n${space(tab)}+ ${item.key}: ${stringify(item.newValue, tab)}`;
      case 'children':
        return `${space(tab)}  ${item.key}: {\n${render(item.value, tab + 2)}\n${space(tab)}}`;
      default:
        return 'Error: missing selector';
    }
  });

  return result.join('\n');
};

const renderTree = tree => `{\n${render(tree)}\n}`;

export default renderTree;
