import { generateServerRecord, getServerLanguage } from '../entities';
import { error } from '../components';
import {
  checkIfAllRequiredArgsAreGiven,
  checkIfUserIsServerAdmin,
  getPrefix,
} from '../helpers';
import { IEventClient, ICommand } from '../types';
import { translate } from '../utils';

export const event: IEventClient = {
  name: 'messageCreate',
  run: async (client, message) => {
    const prefix = getPrefix();

    if (
      message.author.bot ||
      !message.guild ||
      !message.content.startsWith(prefix)
    ) {
      return;
    }

    await generateServerRecord(message.guildId);

    const lang = await getServerLanguage(message.guildId);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    const cmd = args.shift().toLocaleLowerCase();

    if (!cmd) return;

    const command = client.commands.get(cmd) || client.aliases.get(cmd);

    if (!command) {
      return error(message, {
        key: 'error.command-not-found',
        args: { prefix },
      });
    }

    if (command.args) {
      const missingArgs = checkIfAllRequiredArgsAreGiven(command.args, args);

      if (missingArgs.length > 0) {
        const { __ } = await translate(lang);

        const missingArgsList = missingArgs
          .map((arg) => '`' + __(arg.name) + '`' + ' ')
          .toString();

        return error(message, {
          key: 'error.missing-args',
          args: {
            missingArgsList,
          },
        });
      }
    }

    if (command.adminOnly && !checkIfUserIsServerAdmin(message)) {
      return error(message, {
        key: 'error.admin-only',
      });
    }

    (command as ICommand).run(client, message, args);
  },
};
