import { commandNotFound } from '../components';
import { getPrefix } from '../helpers';
import { IEventClient, ICommand } from '../types';

export const event: IEventClient = {
  name: 'messageCreate',
  run: (client, message) => {
    const prefix = getPrefix();

    if (
      message.author.bot ||
      !message.guild ||
      !message.content.startsWith(prefix)
    ) {
      return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    const cmd = args.shift().toLocaleLowerCase();

    if (!cmd) return;

    const command = client.commands.get(cmd) || client.aliases.get(cmd);

    if (!command) {
      return commandNotFound(client, message);
    }

    (command as ICommand).run(client, message, args);
  },
};
