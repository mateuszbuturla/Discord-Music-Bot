import { MessageEmbed } from "discord.js";

export const sendMessage = (messageRoot, message: string | MessageEmbed) => {
  messageRoot.channel.send(message).then((msg) => {
    setTimeout(() => msg.delete(), 5000);
  });
};
