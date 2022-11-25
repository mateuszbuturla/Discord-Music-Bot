import { Collection } from 'discord.js';
import { generateEmbed } from '../../utils';
import { getPrefix } from '../../helpers';
import { ICommand, MessageType } from '../../types';

const getListOfCommandsAsString = (
  commands: Collection<string, ICommand>,
): string => {
  const prefix = getPrefix();
  return commands.map((x) => '`' + prefix + x.name + '`').join(' | ');
};

export const command: ICommand = {
  name: 'help',
  aliases: [],
  run: async (client, message) => {
    const prefix = getPrefix();
    const commands = client.commands;

    const commandListField = {
      name: {
        key: 'command.help.command-list',
        args: { count: commands.size },
      },
      value: getListOfCommandsAsString(commands),
    };

    const embed = await generateEmbed({
      type: MessageType.INFORMATION,
      description: { key: 'command.help.description', args: { prefix } },
      fields: [commandListField],
    });

    message.channel.send({ embeds: [embed] });
  },
};
