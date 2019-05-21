const renderPlain = (tree, prefix = '') => {
  const stringify = (a) => {
    if (!(a instanceof Object)) {
      return a;
    }
    return '[complex value]';
  };

  const result = tree.map((item) => {
    const [key] = Object.keys(item);
    const [value] = Object.values(item);

    switch (value.type) {
      case 'removed':
        return `Property '${prefix}${key}' was removed`;
      case 'added':
        return `Property '${prefix}${key}' was added with value: ${stringify(value.value)}`;
      case 'unchanged':
        return `Property '${prefix}${key}' was unchanged with value: ${stringify(value.value)}`;
      case 'changed':
        return `Property '${prefix}${key}' was updated. From ${stringify(value.old)} to ${stringify(value.new)}`;
      case 'children':
        return `${renderPlain(value.value, (prefix === '') ? `${key}.` : `${prefix}${key}.`)}`;
      default:
        return 'Error: missing selector';
    }
  });

  return result.join('\n');
};

export default renderPlain;
