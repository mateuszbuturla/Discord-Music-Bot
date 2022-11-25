import { Collection, Message } from 'discord.js';
import { generateEmbed } from '../../utils';
import { getPrefix } from '../../helpers';
import { ICommand, MessageType } from '../../types';
import Client from '../../client';
import { commandNotFound } from '../../components';

const getListOfCommandsAsString = (
  commands: Collection<string, ICommand>,
): string => {
  const prefix = getPrefix();
  return commands.map((x) => '`' + prefix + x.name + '`').join(' | ');
};

const sendCommandList = async (client: Client, message: Message) => {
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
};

const sendSpecyficCommandDescription = async (
  client: Client,
  message: Message,
  commandName: string,
) => {
  const prefix = getPrefix();

  const command =
    client.commands.get(commandName) || client.aliases.get(commandName);

  if (!command) {
    return commandNotFound(client, message);
  }

  if (!command.descriptionKey) {
    const embed = await generateEmbed({
      type: MessageType.ERROR,
      description: {
        key: 'error.command-no-description',
        args: { command: `${prefix}${commandName}` },
      },
    });
    return message.channel.send({ embeds: [embed] });
  }

  const commandDescriptionField = {
    name: `${prefix}${command.name}`,
    value: { key: command.descriptionKey },
  };

  const embed = await generateEmbed({
    type: MessageType.INFORMATION,
    fields: [commandDescriptionField],
  });

  message.channel.send({ embeds: [embed] });
};

export const command: ICommand = {
  name: 'help',
  descriptionKey: 'command.help.help-description',
  aliases: [],
  run: async (client, message, args) => {
    if (args.length === 0) {
      return await sendCommandList(client, message);
    }

    return await sendSpecyficCommandDescription(client, message, args[0]);
  },
};
