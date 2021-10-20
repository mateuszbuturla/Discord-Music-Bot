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
    if (checkIfUserIsOnVoiceChannel(client, message, noRemoveMessage)) {
      if (!args[0]) {
        const embed: MessageEmbed = generateEmber(client, {
          type: EmbedType.ERROR,
          description: `Please indicate the title of a song!`,
        });

        return sendMessage(message, embed, noRemoveMessage);
      }

      const queue = client.player.createQueue(message.guild, {
        metadata: message,
      });
      const query = args.join(" ");

      try {
        if (!queue.connection) {
          await queue.connect(message.member.voice.channel);
        }
      } catch (err) {
        const embed: MessageEmbed = generateEmber(client, {
          type: EmbedType.SUCCESS,
          description: `Could not join your voice channel`,
        });

        return sendMessage(message, embed, noRemoveMessage);
      }

      const track = await client.player
        .search(query, {
          requestedBy: message.author,
        })
        .then((x) => x.tracks[0]);

      if (!track) {
        const embed: MessageEmbed = generateEmber(client, {
          type: EmbedType.SUCCESS,
          description: `Track **${query}** not found!`,
        });

        return sendMessage(message, embed, noRemoveMessage);
      }

      await queue.addTrack(track);

      if (!queue.playing) {
        await queue.play();
      }

      const embed: MessageEmbed = generateEmber(client, {
        type: EmbedType.SUCCESS,
        description: `Loading track **${track.title}**!`,
      });

      sendMessage(message, embed, noRemoveMessage);
    }
  },
};
