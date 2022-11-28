import { Message } from 'discord.js';
import { generateEmbed } from '../utils';
import { MessageType, Translate } from '../types';
import { getServerLanguage } from '../entities';

export const error = async (message: Message, description: Translate) => {
  const lang = await getServerLanguage(message.guildId as string);

  const embed = await generateEmbed({
    type: MessageType.ERROR,
    description,
    lang,
  });
  return message.channel.send({ embeds: [embed] });
};
