import { ICommand } from "../../interfaces";
import { IConfig } from "../../interfaces";
import configJSON from "../../config.json";

const reactions = [
  {
    key: "pause",
    icon: "⏸️",
  },
  {
    key: "stop",
    icon: "⏹️",
  },
  {
    key: "skip",
    icon: "⏭️",
  },
  {
    key: "loop",
    icon: "🔄",
  },
  {
    key: "clear",
    icon: "🚮",
  },
];

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
        reactions.map((reaction) => {
          msg.react(reaction.icon);

          const reactionFilter = (filterReaction, user) =>
            filterReaction.emoji.name === reaction.icon &&
            user.id === message.author.id;

          const reactionEmoji = msg.createReactionCollector(reactionFilter, {
            time: 60000,
          });

          reactionEmoji.on("collect", (r, u) => {
            r.users.remove(
              r.users.cache.filter((u) => u === message.author).first()
            );
            const command = client.commands.get(reaction.key);

            if (command) (command as ICommand).run(client, msg, args, true);
          });
        });
      });
  },
};
