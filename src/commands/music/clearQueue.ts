import { ICommand } from "../../interfaces";

export const command: ICommand = {
  name: "clear",
  aliases: [],
  requireOnSpecificChannel: true,
  run: async (client, message, args, noRemoveMessage) => {
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

    if (client.player.getQueue(message).tracks.length <= 1)
      return message.channel
        .send(`There is only one song in the queue.`)
        .then((msg) => {
          setTimeout(() => msg.delete(), 5000);
        });

    client.player.clearQueue(message);

    message.channel
      .send(`The queue has just been **removed** !`)
      .then((msg) => {
        setTimeout(() => msg.delete(), 5000);
      });

    if (noRemoveMessage) {
      return;
    }

    message.delete();
  },
};
