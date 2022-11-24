export const getPrefix = (): string => {
  const prefix = process.env.PREFIX;

  if (!prefix) {
    throw new Error('PREFIX is not defined');
  }

  return prefix;
};
