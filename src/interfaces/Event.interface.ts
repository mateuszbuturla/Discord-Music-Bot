import Client from "../client";
import { ClientEvents } from "discord.js";
import { Queue, Track } from "discord-player";

interface RunClient {
  (client: Client | Queue, ...args: any[]);
}
interface RunPlayer {
  (queue: Queue, track: Track, client: Client);
}

export enum EventType {
  CLIENT,
  PLAYER,
}
export interface IEventClient {
  name: keyof ClientEvents;
  type: EventType;
  run: RunClient;
}
export interface IEventPlayer {
  name: string;
  type: EventType;
  run: RunPlayer;
}
