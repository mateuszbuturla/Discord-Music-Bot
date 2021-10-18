import { MessageEmbed } from "discord.js";
import { checkIfIsPlayingCurrently } from "../../helpers/checkIfIsPlayingCurrently";
import { checkIfUserIsOnVoiceChannel } from "../../helpers/checkIfUserIsOnVoiceChannel";
import { ICommand } from "../../interfaces";
import { EmbedType } from "../../interfaces/Embed.interface";
import { generateEmber } from "../../utils/generateEmbed";
import { sendMessage } from "../../utils/sendMessage";

export const command: ICommand = {
  name: "queue",
  aliases: [],
  requireOnSpecificChannel: true,
  run: async (client, message, args, noRemoveMessage) => {
    if (
      checkIfUserIsOnVoiceChannel(client, message, noRemoveMessage) &&
      checkIfIsPlayingCurrently(client, message, noRemoveMessage)
    ) {
      const queue = client.player.getQueue(message);

      const embed: MessageEmbed = generateEmber(client, {
        type: EmbedType.SUCCESS,
        description:
          `Current : ${queue.playing.title} | ${queue.playing.author}\n\n` +
          (queue.tracks
            .map((track, i) => {
              return `**#${i + 1}** - ${track.title} | ${
                track.author
              } (requested by : ${track.requestedBy.username})`;
            })
            .join("\n") +
            `\nIn the playlist **${queue.tracks.length}** song(s)...`),
      });

      sendMessage(message, embed, noRemoveMessage);
    }
  },
};
