export const padString = (value, symbol, length, isLeft = true) => {
  const valueLength = value.length;

  if (valueLength > length) {
    return value.substr(0, length);
  }

  const padValue = Array(length + 1 - valueLength).join(symbol);

  return isLeft ? `${padValue}${value}` : `${value}${padValue}`;
};
