export const padString = (value, symbol, length, isLeft = true) => {
  const valueLength = value.length;

  if (valueLength > length) {
    return value.substr(0, length);
  }

  const padValue = Array(length + 1 - valueLength).join(symbol);

  return isLeft ? `${padValue}${value}` : `${value}${padValue}`;
};

export const convertTransferTypes = (transferTypes = []) => (
  transferTypes.reduce((acc, { feefineTypeId, ...rest }) => {
    acc[feefineTypeId] = rest;

    return acc;
  }, {})
);

export const shouldTransferTypesUpdate = (inititalTransferTypes = [], transferTypes = []) => {
  if (inititalTransferTypes.length !== transferTypes.length) {
    return true;
  }

  const inititalTypesMap = convertTransferTypes(inititalTransferTypes);

  return transferTypes.some(({ itemType, feefineTypeId }) => (
    !inititalTypesMap[feefineTypeId]
    || itemType !== inititalTypesMap[feefineTypeId].itemType
  ));
};
