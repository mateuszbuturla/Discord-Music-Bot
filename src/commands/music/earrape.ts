import { MessageEmbed } from "discord.js";
import { checkIfIsPlayingCurrently } from "../../helpers/checkIfIsPlayingCurrently";
import { checkIfUserIsOnVoiceChannel } from "../../helpers/checkIfUserIsOnVoiceChannel";
import { ICommand } from "../../interfaces";
import { EmbedType } from "../../interfaces/Embed.interface";
import { generateEmber } from "../../utils/generateEmbed";
import { sendMessage } from "../../utils/sendMessage";

export const command: ICommand = {
  name: "earrape",
  aliases: [],
  requireOnSpecificChannel: true,
  run: async (client, message, args, noRemoveMessage) => {
    if (
      checkIfUserIsOnVoiceChannel(client, message, noRemoveMessage) &&
      checkIfIsPlayingCurrently(client, message, noRemoveMessage)
    ) {
      try {
        const queue = client.player.getQueue(message.guild.id);
        const filters = queue.getFiltersEnabled();
        const earrapeEnabled = !filters.includes("earrape");

        queue.setFilters({ earrape: earrapeEnabled });

        const embed: MessageEmbed = generateEmber(client, {
          type: EmbedType.SUCCESS,
          description: earrapeEnabled ? `Earrape enabled!` : `Earrape disabled`,
        });

        sendMessage(message, embed, noRemoveMessage);
      } catch {
        const embed: MessageEmbed = generateEmber(client, {
          type: EmbedType.SUCCESS,
          description: `Could not update earrape filter!`,
        });

        return sendMessage(message, embed, noRemoveMessage);
      }
    }
  },
};
