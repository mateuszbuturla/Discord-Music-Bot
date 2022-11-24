import { Message } from 'discord.js';
import { sendMessage } from '../utils';
import Client from '../client';

export const commandNotFound = (client: Client, message: Message) => {
  sendMessage(message, `Unknown command`);
};
