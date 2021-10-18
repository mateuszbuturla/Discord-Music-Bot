import { MessageEmbed } from "discord.js";
import ConfigJSON from "../config.json";
import { IConfig } from "../interfaces/Config.interface";
import { EmbedType } from "../interfaces/Embed.interface";
import { generateEmber } from "../utils/generateEmbed";
import { sendMessage } from "../utils/sendMessage";

export const commandNotFound = (client, message) => {
  const config: IConfig = ConfigJSON;

  const embed = new MessageEmbed();

  embed.setColor("RED");
  embed.setAuthor(
    client.user.username,
    client.user.displayAvatarURL({ size: 1024, dynamic: true })
  );
  embed.setDescription(
    `Unknown command. Type ${config.prefix}help to show commands list.`
  );

  sendMessage(message, embed);

  message.delete();
};
