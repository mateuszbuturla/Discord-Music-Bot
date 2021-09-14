import { IEvent } from "../interfaces";

export const event: IEvent = {
  name: "ready",
  run: (client) => {
    console.log(`${client.user.tag} is online!`);
  },
};
