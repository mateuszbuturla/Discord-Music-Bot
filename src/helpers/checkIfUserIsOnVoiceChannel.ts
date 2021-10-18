import { MessageEmbed } from "discord.js";
import { EmbedType } from "../interfaces/Embed.interface";
import { generateEmber } from "../utils/generateEmbed";
import { sendMessage } from "../utils/sendMessage";

export const checkIfUserIsOnVoiceChannel = (
  client,
  message,
  noRemoveMessage?: boolean
): boolean => {
  if (!message.member.voice.channel) {
    const embed: MessageEmbed = generateEmber(client, {
      type: EmbedType.ERROR,
      description: `You're not in a voice channel !`,
    });

    sendMessage(message, embed, noRemoveMessage);

    return false;
  }
  if (
    message.guild.me.voice.channel &&
    message.member.voice.channel.id !== message.guild.me.voice.channel.id
  ) {
    const embed: MessageEmbed = generateEmber(client, {
      type: EmbedType.ERROR,
      description: `You are not in the same voice channel !`,
    });

    sendMessage(message, embed, noRemoveMessage);

    return false;
  }

  return true;
};
