const renderPlain = (tree, prefix = '') => {
  const stringify = (a) => {
    if (!(a instanceof Object)) {
      return a;
    }
    return '[complex value]';
  };

  const result = tree.map((item) => {
    const [type] = Object.keys(item);
    const [node] = Object.values(item);

    switch (type) {
      case 'removed':
        return `Property '${prefix}${node.key}' was removed`;
      case 'added':
        return `Property '${prefix}${node.key}' was added with value: ${stringify(node.value)}`;
      case 'unchanged':
        return `Property '${prefix}${node.key}' was unchanged with value: ${stringify(node.value)}`;
      case 'changed':
        return `Property '${prefix}${node.key}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
      case 'children':
        return `${renderPlain(node.value, (prefix === '') ? `${node.key}.` : `${prefix}${node.key}.`)}`;
      default:
        return 'Error: missing selector';
    }
  });

  return result.join('\n');
};

export default renderPlain;
