import { MessageEmbed } from "discord.js";
import { ICommand } from "../../interfaces";
import { EmbedType } from "../../interfaces/Embed.interface";
import { generateEmber } from "../../utils/generateEmbed";
import { sendMessage } from "../../utils/sendMessage";

export const command: ICommand = {
  name: "ping",
  aliases: [],
  run: async (client, message, args) => {
    const embed: MessageEmbed = generateEmber(client, {
      type: EmbedType.SUCCESS,
      description: `${client.ws.ping} ping`,
    });

    sendMessage(message, embed);
  },
};
