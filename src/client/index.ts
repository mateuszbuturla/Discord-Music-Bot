import { Channel, Client, Collection, Intents, Message } from "discord.js";
import path from "path";
import { readdirSync } from "fs";
import { ICommand, IConfig, IEvent } from "../interfaces";
import ConfigJSON from "../config.json";
import { Player } from "discord-player";
import { logger } from "../utils/logger";

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

class ExtendedClient extends Client {
  public commands: Collection<string, ICommand> = new Collection();
  public events: Collection<string, IEvent> = new Collection();
  public config: IConfig = ConfigJSON;
  public aliases: Collection<string, ICommand> = new Collection();
  public player: Player;
  public rootBotMessage: Message;
  public rootBotChannel: Channel;

  constructor() {
    super({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
      ],
    });
  }

  public async init() {
    this.login(this.config.token);

    const commandPath = path.join(__dirname, "..", "commands");
    readdirSync(commandPath).forEach((dir) => {
      const commands = readdirSync(`${commandPath}/${dir}`).filter((file) =>
        file.endsWith(".ts")
      );

      for (const file of commands) {
        const { command } = require(`${commandPath}/${dir}/${file}`);
        this.commands.set(command.name, command);
        logger(`Command ${command.name} has been loaded`);
        if (command?.aliases.length !== 0) {
          command.aliases.forEach((alias) => {
            this.aliases.set(alias, command);
          });
        }
      }
    });

    const eventPath = path.join(__dirname, "..", "events");
    readdirSync(eventPath).forEach(async (file) => {
      const { event } = await import(`${eventPath}/${file}`);
      this.events.set(event.name, event);
      logger(`Event ${event.name} has been loaded`);
      this.on(event.name, event.run.bind(null, this));
    });

    this.player = new Player(this);

    this.on("ready", () => {
      this.setRootBotMessageReactions();
      this.user.setPresence({
        status: "online",
        activity: {
          name: `Using: ${this.config.prefix}help`,
          type: "PLAYING",
        },
      });
    });
  }

  setRootBotMessageReactions = () => {
    this.channels.cache.forEach((channel) => {
      if (channel.name === this.config.botChannel) {
        this.rootBotChannel = channel;
        return;
      }
    });

    if (this.rootBotChannel) {
      this.rootBotChannel.messages.fetch().then((messages) => {
        let count = 0;
        let messagesArray = [];

        messages.forEach((message) => {
          messagesArray = [...messagesArray, message];
          count++;
        });

        const rootBotMessage = messagesArray[count - 1];
        this.rootBotMessage = rootBotMessage;

        reactions.map((reaction) => {
          rootBotMessage.react(reaction.icon);

          const reactionFilter = (filterReaction, user) =>
            filterReaction.emoji.name === reaction.icon &&
            user.id !== rootBotMessage.author.id;

          const reactionEmoji = rootBotMessage.createReactionCollector(
            reactionFilter,
            {
              time: 60000,
            }
          );

          reactionEmoji.on("collect", (r, u) => {
            r.users.remove(
              r.users.cache
                .filter((u) => u !== this.rootBotMessage.author)
                .first()
            );
            const command = this.commands.get(reaction.key);

            if (command)
              (command as ICommand).run(this, rootBotMessage, [], true);
          });
        });
      });
    }
  };
}

export default ExtendedClient;
