export const logger = (message: string) => {
  const date = new Date(),
    dateFormated =
      [date.getMonth() + 1, date.getDate(), date.getFullYear()].join('/') +
      ' ' +
      [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');
  console.log(`[${dateFormated}] ${message}`);
};
