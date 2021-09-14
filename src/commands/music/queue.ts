import { ICommand } from "../../interfaces";

export const command: ICommand = {
  name: "queue",
  aliases: [],
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      return message.channel.send(`You're not in a voice channel !`);

    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return message.channel.send(`You are not in the same voice channel !`);

    const queue = client.player.getQueue(message);

    if (!client.player.getQueue(message))
      return message.channel.send(`No songs currently playing !`);

    message.channel.send(
      `Current : ${queue.playing.title} | ${queue.playing.author}\n\n` +
        (queue.tracks
          .map((track, i) => {
            return `**#${i + 1}** - ${track.title} | ${
              track.author
            } (requested by : ${track.requestedBy.username})`;
          })
          .join("\n") +
          `\nIn the playlist **${queue.tracks.length}** song(s)...`)
    );
  },
};
