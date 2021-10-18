import { MessageEmbed } from "discord.js";
import { EmbedType } from "../interfaces/Embed.interface";
import { generateEmber } from "../utils/generateEmbed";
import { sendMessage } from "../utils/sendMessage";

export const checkIfIsPlayingCurrently = (
  client,
  message,
  noRemoveMessage: boolean
): boolean => {
  if (!client.player.getQueue(message)) {
    const embed: MessageEmbed = generateEmber(client, {
      type: EmbedType.ERROR,
      description: `No music currently playing !`,
    });

    sendMessage(message, embed, noRemoveMessage);

    return false;
  }

  return true;
};
