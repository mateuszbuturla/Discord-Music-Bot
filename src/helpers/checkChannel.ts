import { IConfig } from "../interfaces";
import configJSON from "../config.json";

export const checkChannel = (message): boolean => {
  const config: IConfig = configJSON;

  if (!message.channel.name.includes(config.botChannel)) {
    message.channel.send(
      `Do commands only at <#${config.botChannel}>! \n You can generate bot channel automatically using command !setup`
    );
    return false;
  }

  return true;
};
