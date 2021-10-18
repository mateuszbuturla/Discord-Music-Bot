import { IConfig } from "../interfaces";
import configJSON from "../config.json";
import { MessageEmbed } from "discord.js";
import { generateEmber } from "../utils/generateEmbed";
import { EmbedType } from "../interfaces/Embed.interface";
import { sendMessage } from "../utils/sendMessage";

export const checkChannel = (client, message): boolean => {
  const config: IConfig = configJSON;

  if (!message.channel.name.includes(config.botChannel)) {
    const embed: MessageEmbed = generateEmber(client, {
      type: EmbedType.ERROR,
      description: `Do commands only at <#${config.botChannel}>! \n You can generate bot channel automatically using command !setup`,
    });

    sendMessage(message, embed);
    return false;
  }

  return true;
};
