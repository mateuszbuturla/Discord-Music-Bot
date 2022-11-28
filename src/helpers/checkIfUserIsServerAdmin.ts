import { Message } from 'discord.js';

export const checkIfUserIsServerAdmin = (message: Message): boolean => {
  if (!message.member) {
    return false;
  }

  return message.member.permissions.has('Administrator');
};
