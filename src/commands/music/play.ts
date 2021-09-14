import { ICommand } from "../../interfaces";
import { checkChannel } from "../../helpers/checkChannel";

export const command: ICommand = {
  name: "play",
  aliases: [],
  requireOnSpecificChannel: true,
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      return message.channel
        .send(` You're not in a voice channel!`)
        .then((msg) => {
          setTimeout(() => msg.delete(), 5000);
        });

    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return message.channel
        .send(`You are not in the same voice channel!`)
        .then((msg) => {
          setTimeout(() => msg.delete(), 5000);
        });

    if (!args[0])
      return message.channel
        .send(`Please indicate the title of a song!`)
        .then((msg) => {
          setTimeout(() => msg.delete(), 5000);
        });

    client.player.play(message, args.join(" "), true);

    message.delete();
  },
};
