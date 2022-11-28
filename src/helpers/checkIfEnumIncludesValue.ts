export const checkIfEnumIncludesValue = (
  enumObj: Object,
  value: string,
): boolean => {
  const values = Object.values(enumObj);

  return values.includes(value);
};
