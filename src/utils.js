export const padLeft = (value, symbol, length) => {
  const valueLength = value.length;

  if (valueLength > length) {
    return value.substr(0, length);
  }

  return `${Array(length + 1 - valueLength).join(symbol)}${value}`;
};
