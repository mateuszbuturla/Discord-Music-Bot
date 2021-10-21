import { MessageEmbed } from "discord.js";
import { checkIfIsPlayingCurrently } from "../../helpers/checkIfIsPlayingCurrently";
import { checkIfUserIsOnVoiceChannel } from "../../helpers/checkIfUserIsOnVoiceChannel";
import { ICommand } from "../../interfaces";
import { EmbedType } from "../../interfaces/Embed.interface";
import { generateEmber } from "../../utils/generateEmbed";
import { sendMessage } from "../../utils/sendMessage";

export const command: ICommand = {
  name: "loop",
  aliases: [],
  requireOnSpecificChannel: true,
  run: async (client, message, args, noRemoveMessage) => {
    if (
      checkIfUserIsOnVoiceChannel(client, message, noRemoveMessage) &&
      checkIfIsPlayingCurrently(client, message, noRemoveMessage)
    ) {
      try {
        const queue = client.player.getQueue(message.guild.id);
        const isLoop = queue.repeatMode;
        queue.setRepeatMode(isLoop === 0 ? 2 : 0);

        const embed: MessageEmbed = generateEmber(client, {
          type: EmbedType.SUCCESS,
          description:
            isLoop === 2
              ? `Repeat mode **disabled** !`
              : `Repeat mode **enabled** !`,
        });

        sendMessage(message, embed, noRemoveMessage);
      } catch {
        const embed: MessageEmbed = generateEmber(client, {
          type: EmbedType.SUCCESS,
          description: `Could not change loop!`,
        });

        return sendMessage(message, embed, noRemoveMessage);
      }
    }
  },
};
