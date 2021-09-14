import { ICommand } from "../../interfaces";

export const command: ICommand = {
  name: "ping",
  aliases: ["p"],
  run: async (client, message, args) => {
    message.channel.send(`${client.ws.ping} ping`);
  },
};
