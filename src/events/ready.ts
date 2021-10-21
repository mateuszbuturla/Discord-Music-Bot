import { IEventClient } from "../interfaces";
import { EventType } from "../interfaces/Event.interface";

export const event: IEventClient = {
  name: "ready",
  type: EventType.CLIENT,
  run: (client) => {
    console.log(`${client.user.tag} is online!`);
  },
};
