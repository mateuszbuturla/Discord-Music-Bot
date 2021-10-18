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
      if (client.player.getQueue(message).tracks.length <= 1) {
        const embed: MessageEmbed = generateEmber(client, {
          type: EmbedType.ERROR,
          description: `There is only one song in the queue.`,
        });

        sendMessage(message, embed, noRemoveMessage);

        return;
      }

      const isLoop = client.player.getQueue(message).loopMode;

      client.player.setLoopMode(message, !isLoop);
      const embed: MessageEmbed = generateEmber(client, {
        type: EmbedType.SUCCESS,
        description: isLoop
          ? `Repeat mode **disabled** !`
          : `Repeat mode **enabled** !`,
      });

      sendMessage(message, embed, noRemoveMessage);
    }
  },
};
