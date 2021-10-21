import { MessageEmbed } from "discord.js";
import { checkIfIsPlayingCurrently } from "../../helpers/checkIfIsPlayingCurrently";
import { checkIfUserIsOnVoiceChannel } from "../../helpers/checkIfUserIsOnVoiceChannel";
import { ICommand } from "../../interfaces";
import { EmbedType } from "../../interfaces/Embed.interface";
import { generateEmber } from "../../utils/generateEmbed";
import { sendMessage } from "../../utils/sendMessage";

export const command: ICommand = {
  name: "back",
  aliases: [],
  requireOnSpecificChannel: true,
  run: async (client, message, args, noRemoveMessage) => {
    if (
      checkIfUserIsOnVoiceChannel(client, message, noRemoveMessage) &&
      checkIfIsPlayingCurrently(client, message, noRemoveMessage)
    ) {
      try {
        const queue = client.player.getQueue(message.guild.id);
        queue.back();

        const embed: MessageEmbed = generateEmber(client, {
          type: EmbedType.SUCCESS,
          description: `Playing prevous track!`,
        });

        sendMessage(message, embed, noRemoveMessage);
      } catch {
        const embed: MessageEmbed = generateEmber(client, {
          type: EmbedType.SUCCESS,
          description: `Could not play prevous track!`,
        });

        return sendMessage(message, embed, noRemoveMessage);
      }
    }
  },
};
