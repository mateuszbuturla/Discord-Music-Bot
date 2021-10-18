import { IEvent, ICommand } from "../interfaces";
import { Message } from "discord.js";
import { checkChannel } from "../helpers/checkChannel";
import ConfigJSON from "../config.json";

export const event: IEvent = {
  name: "message",
  run: (client, message: Message) => {
    if (
      message.author.bot ||
      !message.guild ||
      !message.content.startsWith(client.config.prefix)
    ) {
      return;
    }

    const args = message.content
      .slice(client.config.prefix.length)
      .trim()
      .split(/ +/g);

    const cmd = args.shift().toLocaleLowerCase();

    if (!cmd) return;

    const command = client.commands.get(cmd) || client.aliases.get(cmd);

    if (command) {
      if (command.requireOnSpecificChannel) {
        const validateChannel = checkChannel(message);

        if (!validateChannel) {
          return;
        }
      }

      (command as ICommand).run(client, message, args);
    } else {
      message.channel
        .send(
          `Unknown command. Type ${ConfigJSON.prefix}help to show commands list.`
        )
        .then((msg) => {
          setTimeout(() => msg.delete(), 5000);
        });

      message.delete();
    }
  },
};
