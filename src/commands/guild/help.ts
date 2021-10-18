import { MessageEmbed } from "discord.js";
import { ICommand } from "../../interfaces";
import { EmbedType } from "../../interfaces/Embed.interface";
import { generateEmber } from "../../utils/generateEmbed";

export const command: ICommand = {
  name: "help",
  aliases: ["h"],
  requireOnSpecificChannel: false,

  run: async (client, message, args) => {
    const commands = client.commands;

    const embed: MessageEmbed = generateEmber(client, {
      type: EmbedType.SUCCESS,
      description: "Commands list for Owl Music Bot",
      footer: "Made by Bucik689",
      setTimestamp: true,
    });

    embed.addField(
      `Enabled - ${commands.size}`,
      commands
        .map(
          (x) =>
            `\`${x.name}${
              x.aliases[0] ? ` (${x.aliases.map((y) => y).join(", ")})\`` : "`"
            }`
        )
        .join(" | ")
    );

    message.author.send(embed);
    message.delete();
  },
};
