const renderPlain = (tree, prefix = '') => {
  const stringify = (a) => {
    if (!(a instanceof Object)) {
      return a;
    }
    return '[complex value]';
  };

  const result = tree.map((item) => {
    const [, key] = Object.keys(item);
    const [status, value] = Object.values(item);
    if (status === 'removed') {
      return `\nProperty '${prefix}${key}' was removed`;
    }
    if (status === 'added') {
      return `\nProperty '${prefix}${key}' was added with value: ${stringify(value)}`;
    }
    if (status === 'unchanged') {
      return `\nProperty '${prefix}${key}' was unchanged with value: ${stringify(value)}`;
    }
    if (status === 'changed') {
      return `\nProperty '${prefix}${key}' was updated. From ${stringify(value.old)} to ${stringify(value.new)}`;
    }
    if (status === 'children') {
      return `${renderPlain(value, (prefix === '') ? `${key}.` : `${prefix}${key}.`)}`;
    }
    return 'error';
  });

  return result.join('');
};

export default renderPlain;
