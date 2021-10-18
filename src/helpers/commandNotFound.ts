import { MessageEmbed } from "discord.js";
import ConfigJSON from "../config.json";
import { IConfig } from "../interfaces/Config.interface";

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

  message.channel.send(embed).then((msg) => {
    setTimeout(() => msg.delete(), 5000);
  });

  message.delete();
};
