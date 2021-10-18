import { MessageEmbed } from "discord.js";
import ConfigJSON from "../config.json";
import { IConfig } from "../interfaces/Config.interface";
import { EmbedType } from "../interfaces/Embed.interface";
import { generateEmber } from "../utils/generateEmbed";

export const commandNotFound = (client, message) => {
  const config: IConfig = ConfigJSON;

  const embed: MessageEmbed = generateEmber(client, {
    type: EmbedType.ERROR,
    description: `Unknown command. Type ${config.prefix}help to show commands list.`,
  });

  message.channel.send(embed).then((msg) => {
    setTimeout(() => msg.delete(), 5000);
  });

  message.delete();
};
