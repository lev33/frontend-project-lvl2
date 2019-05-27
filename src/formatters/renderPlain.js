const renderPlain = (tree, prefix = '') => {
  const stringify = (a) => {
    if (!(a instanceof Object)) {
      return a;
    }
    return '[complex value]';
  };

  const result = tree.map((item) => {
    switch (item.type) {
      case 'removed':
        return `Property '${prefix}${item.key}' was removed`;
      case 'added':
        return `Property '${prefix}${item.key}' was added with value: ${stringify(item.value)}`;
      case 'unchanged':
        return `Property '${prefix}${item.key}' was unchanged with value: ${stringify(item.value)}`;
      case 'changed':
        return `Property '${prefix}${item.key}' was updated. From ${stringify(item.oldValue)} to ${stringify(item.newValue)}`;
      case 'children':
        return `${renderPlain(item.children, (prefix === '') ? `${item.key}.` : `${prefix}${item.key}.`)}`;
      default:
        throw new Error('missing selector');
    }
  });

  return result.join('\n');
};

export default renderPlain;
