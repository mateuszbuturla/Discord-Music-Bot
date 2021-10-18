import { MessageEmbed } from "discord.js";
import { checkIfUserIsOnVoiceChannel } from "../../helpers/checkIfUserIsOnVoiceChannel";
import { ICommand } from "../../interfaces";
import { EmbedType } from "../../interfaces/Embed.interface";
import { generateEmber } from "../../utils/generateEmbed";
import { sendMessage } from "../../utils/sendMessage";

export const command: ICommand = {
  name: "clear",
  aliases: [],
  requireOnSpecificChannel: true,
  run: async (client, message, args, noRemoveMessage) => {
    if (
      checkIfUserIsOnVoiceChannel(client, message, noRemoveMessage) &&
      checkIfUserIsOnVoiceChannel(client, message, noRemoveMessage)
    ) {
      if (client.player.getQueue(message).tracks.length <= 1) {
        const embed: MessageEmbed = generateEmber(client, {
          type: EmbedType.ERROR,
          description: `There is only one song in the queue.`,
        });

        sendMessage(message, embed, noRemoveMessage);

        return;
      }

      client.player.clearQueue(message);

      const embed: MessageEmbed = generateEmber(client, {
        type: EmbedType.SUCCESS,
        description: `The queue has just been **removed** !`,
      });

      sendMessage(message, embed, noRemoveMessage);
    }
  },
};
