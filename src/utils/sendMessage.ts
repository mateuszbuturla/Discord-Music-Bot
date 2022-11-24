import { Message } from 'discord.js';

export const sendMessage = (messageRoot: Message, message: string) => {
  messageRoot.channel.send({ content: message });
};
