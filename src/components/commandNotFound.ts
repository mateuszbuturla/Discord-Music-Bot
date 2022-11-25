import { Message } from 'discord.js';
import { sendMessage, translate } from '../utils';
import Client from '../client';
import { Language } from '../types';
import { getPrefix } from '../helpers';

export const commandNotFound = async (client: Client, message: Message) => {
  const { __ } = await translate(Language.en);
  const prefix = getPrefix();

  sendMessage(message, __('error.command-not-found', { prefix }));
};
