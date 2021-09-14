import { ICommand } from "../../interfaces";
import { IConfig } from "../../interfaces";
import configJSON from "../../config.json";

export const command: ICommand = {
  name: "setup",
  aliases: [],
  run: async (client, message, args) => {
    const config: IConfig = configJSON;

    const channel = message.guild.channels.cache.find(
      (channel) => channel.name === config.botChannel
    );
    if (channel) {
      return message.channel.send(`Bot channel is already exist!`);
    }

    message.guild.channels
      .create(config.botChannel)
      .then((channel) => channel.send("Bucik689's Music Bot"))
      .then((msg) => {
        msg.react("⏸️");
        msg.react("⏸️");
        msg.react("⏹️");
        msg.react("⏭️");
        msg.react("🔄");
        msg.react("🚮");
      });
  },
};
