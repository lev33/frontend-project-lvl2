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
    const [type] = Object.keys(item);
    const [node] = Object.values(item);

    switch (type) {
      case 'removed':
        return `${space(tab)}- ${node.key}: ${stringify(node.value, tab)}`;
      case 'added':
        return `${space(tab)}+ ${node.key}: ${stringify(node.value, tab)}`;
      case 'unchanged':
        return `${space(tab)}  ${node.key}: ${stringify(node.value, tab)}`;
      case 'changed':
        return `${space(tab)}- ${node.key}: ${stringify(node.oldValue, tab)}\n${space(tab)}+ ${node.key}: ${stringify(node.newValue, tab)}`;
      case 'children':
        return `${space(tab)}  ${node.key}: {\n${render(node.value, tab + 2)}\n${space(tab)}}`;
      default:
        return 'Error: missing selector';
    }
  });

  return result.join('\n');
};

const renderTree = tree => `{\n${render(tree)}\n}`;

export default renderTree;
