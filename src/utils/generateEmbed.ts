import { getColor } from "./getColor";
import { MessageEmbed } from "discord.js";
import { EmbedOptions } from "../interfaces/Embed.interface";

export const generateEmber = (
  client,
  { type, description, footer }: EmbedOptions
): MessageEmbed => {
  const embed = new MessageEmbed();

  embed.setColor(getColor(type));
  embed.setAuthor(
    client.user.username,
    client.user.displayAvatarURL({ size: 1024, dynamic: true })
  );
  embed.setDescription(description);

  if (footer) {
    embed.setFooter(footer);
  }

  return embed;
};
