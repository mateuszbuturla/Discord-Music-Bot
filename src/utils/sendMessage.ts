import { MessageEmbed } from "discord.js";

export const sendMessage = (
  messageRoot,
  message: string | MessageEmbed,
  noRemoveMessage?: boolean
) => {
  if (typeof message === "string") {
    messageRoot.channel.send(message).then((msg) => {
      setTimeout(() => msg.delete(), 5000);
    });
  } else {
    messageRoot.channel.send({ embeds: [message] }).then((msg) => {
      setTimeout(() => msg.delete(), 5000);
    });
  }

  if (!noRemoveMessage) {
    messageRoot.delete();
  }
};
