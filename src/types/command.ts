import Client from '../client';
import { Message } from 'discord.js';

interface Run {
  (client: Client, message: Message, args: string[]): void;
}

export interface Arg {
  name: string;
  required?: boolean;
}

export interface ICommand {
  name: string;
  descriptionKey?: string;
  aliases?: string[];
  adminOnly?: boolean;
  args?: Arg[];
  run: Run;
}
