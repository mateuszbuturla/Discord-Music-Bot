import { ICommand } from "../../interfaces";

export const command: ICommand = {
  name: "loop",
  aliases: [],
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      return message.channel.send(`You're not in a voice channel !`);

    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return message.channel.send(`You are not in the same voice channel !`);

    if (!client.player.getQueue(message))
      return message.channel.send(`No music currently playing !`);

    const isLoop = client.player.getQueue(message).loopMode;

    client.player.setLoopMode(message, !isLoop);
    message.channel.send(
      isLoop ? `Repeat mode **disabled** !` : `Repeat mode **enabled** !`
    );
  },
};
