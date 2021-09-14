import { ICommand } from "../../interfaces";

export const command: ICommand = {
  name: "queue",
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

    const queue = client.player.getQueue(message);

    if (!client.player.getQueue(message))
      return message.channel
        .send(`No songs currently playing !`)
        .then((msg) => {
          setTimeout(() => msg.delete(), 5000);
        });

    message.channel
      .send(
        `Current : ${queue.playing.title} | ${queue.playing.author}\n\n` +
          (queue.tracks
            .map((track, i) => {
              return `**#${i + 1}** - ${track.title} | ${
                track.author
              } (requested by : ${track.requestedBy.username})`;
            })
            .join("\n") +
            `\nIn the playlist **${queue.tracks.length}** song(s)...`)
      )
      .then((msg) => {
        setTimeout(() => msg.delete(), 5000);
      });

    message.delete();
  },
};
