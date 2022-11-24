import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { join } from 'path';
import { readdirSync } from 'fs';
import { logger } from '../utils';
import { ICommand, IEventClient } from '../types';

class ExtendedClient extends Client {
  public commands: Collection<string, ICommand> = new Collection();
  public aliases: Collection<string, ICommand> = new Collection();
  public events: Collection<string, IEventClient> = new Collection();

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
  }

  private loadCommands() {
    const commandPath = join(__dirname, '..', 'commands');
    readdirSync(commandPath).forEach((dir) => {
      const commands = readdirSync(`${commandPath}/${dir}`).filter((file) =>
        file.endsWith('.ts'),
      );

      for (const file of commands) {
        const { command } = require(`${commandPath}/${dir}/${file}`);
        this.commands.set(command.name, command);
        logger(`Command ${command.name} has been loaded`);
        if (command?.aliases.length !== 0) {
          command?.aliases.forEach((alias: string) => {
            this.aliases.set(alias, command);
          });
        }
      }
    });
  }

  private loadEvents() {
    const eventPath = join(__dirname, '..', 'events');
    readdirSync(eventPath).forEach(async (file) => {
      const { event } = await import(`${eventPath}/${file}`);
      this.events.set(event.name, event);
      logger(`Event ${event.name} has been loaded`);
      this.on(event.name, event.run.bind(null, this));
    });
  }

  public async init() {
    this.login(process.env.TOKEN);

    this.loadCommands();
    this.loadEvents();
  }
}

export default ExtendedClient;
