import Client from '../client';
import { Message } from 'discord.js';

interface Run {
  (client: Client, message: Message, args: string[]): void;
}

export interface ICommand {
  name: string;
  description?: string;
  aliases?: string[];
  run: Run;
}
