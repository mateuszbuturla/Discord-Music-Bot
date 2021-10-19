import { MessageEmbed } from "discord.js";
import { checkIfUserIsOnVoiceChannel } from "../../helpers/checkIfUserIsOnVoiceChannel";
import { ICommand } from "../../interfaces";
import { EmbedType } from "../../interfaces/Embed.interface";
import { generateEmber } from "../../utils/generateEmbed";
import { sendMessage } from "../../utils/sendMessage";

export const command: ICommand = {
  name: "volume",
  aliases: ["v"],
  requireOnSpecificChannel: true,
  run: async (client, message, args, noRemoveMessage) => {
    if (checkIfUserIsOnVoiceChannel(client, message, noRemoveMessage)) {
      if (!args.length) {
        const embed: MessageEmbed = generateEmber(client, {
          type: EmbedType.ERROR,
          description: `Please provide the volume value!`,
        });

        sendMessage(message, embed, noRemoveMessage);
      }

      client.player.setVolume(message, Number(args[0]));

      const embed: MessageEmbed = generateEmber(client, {
        type: EmbedType.SUCCESS,
        description: `Volume has been changed!`,
      });

      sendMessage(message, embed, noRemoveMessage);
    }
  },
};
