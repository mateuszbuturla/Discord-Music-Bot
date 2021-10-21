import { MessageEmbed } from "discord.js";
import { EmbedType } from "../interfaces/Embed.interface";
import { EventType, IEventPlayer } from "../interfaces";
import { generateEmber } from "../utils/generateEmbed";

export const event: IEventPlayer = {
  name: "trackStart",
  type: EventType.PLAYER,
  run: (queue, track, client) => {
    const embed: MessageEmbed = generateEmber(client, {
      type: EmbedType.SUCCESS,
      description: `Started playing: **${track.title}**!`,
    });
    queue.metadata.channel.send({ embeds: [embed] }).then((msg) => {
      setTimeout(() => msg.delete(), 5000);
    });
  },
};
