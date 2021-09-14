import { Client, Collection, Intents } from "discord.js";
import path from "path";
import { readdirSync } from "fs";
import { ICommand, IConfig, IEvent } from "../interfaces";
import ConfigJSON from "../config.json";
import { Player } from "discord-player";

class ExtendedClient extends Client {
  public commands: Collection<string, ICommand> = new Collection();
  public events: Collection<string, IEvent> = new Collection();
  public config: IConfig = ConfigJSON;
  public aliases: Collection<string, ICommand> = new Collection();
  public player: Player;

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
      console.log(event);
      this.on(event.name, event.run.bind(null, this));
    });

    this.player = new Player(this);
  }
}

export default ExtendedClient;
