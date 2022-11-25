export const getBotName = (): string => {
  const botName = process.env.BOT_NAME;

  if (!botName) {
    throw new Error('BOT_NAME is not defined');
  }

  return botName;
};
