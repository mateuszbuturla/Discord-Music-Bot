import { Message } from 'discord.js';
import { generateEmbed } from '../utils';
import Client from '../client';
import { MessageType } from '../types';
import { getPrefix } from '../helpers';
import { getServerLanguage } from '../entities';

export const commandNotFound = async (client: Client, message: Message) => {
  const lang = await getServerLanguage(message.guildId as string);
  const prefix = getPrefix();

  const embed = await generateEmbed({
    type: MessageType.ERROR,
    description: {
      key: 'error.command-not-found',
      args: { prefix },
    },
    lang,
  });
  return message.channel.send({ embeds: [embed] });
};
