import { ICommand } from "../../interfaces";

export const command: ICommand = {
  name: "pause",
  aliases: [],
  requireOnSpecificChannel: true,
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      return message.channel
        .send(`You're not in a voice channel !`)
        .then((msg) => {
          setTimeout(() => msg.delete(), 5000);
        });

    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return message.channel
        .send(`You are not in the same voice channel !`)
        .then((msg) => {
          setTimeout(() => msg.delete(), 5000);
        });

    if (!client.player.getQueue(message))
      return message.channel
        .send(`No music currently playing !`)
        .then((msg) => {
          setTimeout(() => msg.delete(), 5000);
        });

    if (client.player.getQueue(message).paused)
      return message.channel
        .send(`The music is already paused !`)
        .then((msg) => {
          setTimeout(() => msg.delete(), 5000);
        });

    client.player.pause(message);

    message.channel
      .send(` Song ${client.player.getQueue(message).playing.title} paused !`)
      .then((msg) => {
        setTimeout(() => msg.delete(), 5000);
      });

    message.delete();
  },
};
