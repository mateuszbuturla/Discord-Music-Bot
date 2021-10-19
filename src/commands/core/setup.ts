import { ICommand } from "../../interfaces";
import { IConfig } from "../../interfaces";
import configJSON from "../../config.json";
import { generateEmber } from "../../utils/generateEmbed";
import { MessageEmbed } from "discord.js";
import { EmbedType } from "../../interfaces/Embed.interface";
import { sendMessage } from "../../utils/sendMessage";

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
      const embed: MessageEmbed = generateEmber(client, {
        type: EmbedType.ERROR,
        description: `Bot channel is already exist!`,
      });

      sendMessage(message, embed);
    }

    message.guild.channels
      .create(config.botChannel)
      .then((channel) =>
        channel.send(config.botName, {
          files: [
            "https://cdn.discordapp.com/app-icons/887252420177047552/1f674ac668c75684fae9beba7d4c39e8.png",
          ],
        })
      )
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
