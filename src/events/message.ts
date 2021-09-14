import { IEvent, ICommand } from "../interfaces";
import { Message } from "discord.js";

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

    if (command) (command as ICommand).run(client, message, args);
  },
};
