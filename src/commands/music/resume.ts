import { MessageEmbed } from "discord.js";
import { checkIfIsPlayingCurrently } from "../../helpers/checkIfIsPlayingCurrently";
import { checkIfUserIsOnVoiceChannel } from "../../helpers/checkIfUserIsOnVoiceChannel";
import { ICommand } from "../../interfaces";
import { EmbedType } from "../../interfaces/Embed.interface";
import { generateEmber } from "../../utils/generateEmbed";
import { sendMessage } from "../../utils/sendMessage";

export const command: ICommand = {
  name: "resume",
  aliases: [],
  requireOnSpecificChannel: true,
  run: async (client, message, args, noRemoveMessage) => {
    if (
      checkIfUserIsOnVoiceChannel(client, message, noRemoveMessage) &&
      checkIfIsPlayingCurrently(client, message, noRemoveMessage)
    ) {
      if (!client.player.getQueue(message).paused) {
        const embed: MessageEmbed = generateEmber(client, {
          type: EmbedType.ERROR,
          description: `The music is already playing !`,
        });

        sendMessage(message, embed, noRemoveMessage);

        return;
      }

      client.player.resume(message);

      const embed: MessageEmbed = generateEmber(client, {
        type: EmbedType.SUCCESS,
        description: `Song ${
          client.player.getQueue(message).playing.title
        } resumed!`,
      });

      sendMessage(message, embed, noRemoveMessage);
    }
  },
};
