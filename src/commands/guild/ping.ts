import { ICommand } from '../../types';

export const command: ICommand = {
  name: 'ping',
  descriptionKey: 'command.ping.help-description',
  aliases: [],
  run: async (client, message) => {
    message.channel.send({ content: `${client.ws.ping} ping` });
  },
};
