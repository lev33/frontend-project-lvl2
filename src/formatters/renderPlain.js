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
    if (value.type === 'removed') {
      return `Property '${prefix}${key}' was removed`;
    }
    if (value.type === 'added') {
      return `Property '${prefix}${key}' was added with value: ${stringify(value.value)}`;
    }
    if (value.type === 'unchanged') {
      return `Property '${prefix}${key}' was unchanged with value: ${stringify(value.value)}`;
    }
    if (value.type === 'changed') {
      return `Property '${prefix}${key}' was updated. From ${stringify(value.old)} to ${stringify(value.new)}`;
    }
    if (value.type === 'children') {
      return `${renderPlain(value.value, (prefix === '') ? `${key}.` : `${prefix}${key}.`)}`;
    }
    return 'error';
  });

  return result.join('\n');
};

export default renderPlain;
