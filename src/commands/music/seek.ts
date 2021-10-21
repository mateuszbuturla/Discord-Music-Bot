import { MessageEmbed } from "discord.js";
import { checkIfIsPlayingCurrently } from "../../helpers/checkIfIsPlayingCurrently";
import { checkIfUserIsOnVoiceChannel } from "../../helpers/checkIfUserIsOnVoiceChannel";
import { ICommand } from "../../interfaces";
import { EmbedType } from "../../interfaces/Embed.interface";
import { generateEmber } from "../../utils/generateEmbed";
import { sendMessage } from "../../utils/sendMessage";

export const command: ICommand = {
  name: "seek",
  aliases: [],
  requireOnSpecificChannel: true,
  run: async (client, message, args, noRemoveMessage) => {
    if (
      checkIfUserIsOnVoiceChannel(client, message, noRemoveMessage) &&
      checkIfIsPlayingCurrently(client, message, noRemoveMessage)
    ) {
      if (!args.length) {
        const embed: MessageEmbed = generateEmber(client, {
          type: EmbedType.ERROR,
          description: `Please provide the time to skip!`,
        });

        sendMessage(message, embed, noRemoveMessage);
      }

      try {
        const queue = client.player.getQueue(message.guild.id);
        queue.seek(Number(args[0]));

        const embed: MessageEmbed = generateEmber(client, {
          type: EmbedType.SUCCESS,
          description: `Volume **changed**!`,
        });

        sendMessage(message, embed, noRemoveMessage);
      } catch {
        const embed: MessageEmbed = generateEmber(client, {
          type: EmbedType.SUCCESS,
          description: `Could not seek track!`,
        });

        return sendMessage(message, embed, noRemoveMessage);
      }
    }
  },
};
