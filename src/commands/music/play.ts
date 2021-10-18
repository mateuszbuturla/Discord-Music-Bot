import { ICommand } from "../../interfaces";
import { checkIfUserIsOnVoiceChannel } from "../../helpers/checkIfUserIsOnVoiceChannel";
import { checkIfIsPlayingCurrently } from "../../helpers/checkIfIsPlayingCurrently";
import { generateEmber } from "../../utils/generateEmbed";
import { MessageEmbed } from "discord.js";
import { EmbedType } from "../../interfaces/Embed.interface";
import { sendMessage } from "../../utils/sendMessage";

export const command: ICommand = {
  name: "play",
  aliases: [],
  requireOnSpecificChannel: true,
  run: async (client, message, args, noRemoveMessage) => {
    if (
      checkIfUserIsOnVoiceChannel(client, message, noRemoveMessage) &&
      checkIfIsPlayingCurrently(client, message, noRemoveMessage)
    ) {
      if (!args[0]) {
        const embed: MessageEmbed = generateEmber(client, {
          type: EmbedType.ERROR,
          description: `Please indicate the title of a song!`,
        });

        sendMessage(message, embed, noRemoveMessage);

        return;
      }

      client.player.play(message, args.join(" "), true);

      const embed: MessageEmbed = generateEmber(client, {
        type: EmbedType.SUCCESS,
        description: `Song has been added to queue!`,
      });

      sendMessage(message, embed, noRemoveMessage);
    }
  },
};
