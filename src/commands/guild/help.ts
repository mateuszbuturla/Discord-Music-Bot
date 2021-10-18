import { MessageEmbed } from "discord.js";
import { ICommand } from "../../interfaces";

export const command: ICommand = {
  name: "help",
  aliases: ["h"],
  requireOnSpecificChannel: false,

  run: async (client, message, args) => {
    const embed = new MessageEmbed();

    embed.setColor("RED");
    embed.setAuthor(
      client.user.username,
      client.user.displayAvatarURL({ size: 1024, dynamic: true })
    );

    const commands = client.commands;

    embed.setDescription("Commands list for Owl Music Bot");
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

    embed.setTimestamp();
    embed.setFooter(
      "Made by Bucik689",
      message.author.avatarURL({ dynamic: true })
    );

    message.author.send(embed);
    message.delete();
  },
};
