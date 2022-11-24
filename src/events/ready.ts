import { IEventClient } from '../types';

export const event: IEventClient = {
  name: 'ready',
  run: (client) => {
    console.log(`${client.user?.tag} is online!`);
  },
};
