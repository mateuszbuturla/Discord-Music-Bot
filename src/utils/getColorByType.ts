import { ColorResolvable } from 'discord.js';
import { MessageType } from '../types';

const colorSuccess = 0x00ba0c;
const colorError = 0xb00202;
const colorInformation = 0x0389a1;

export const getColorByType = (type: MessageType): ColorResolvable => {
  switch (type) {
    case MessageType.SUCCESS:
      return colorSuccess;
    case MessageType.ERROR:
      return colorError;
    case MessageType.INFORMATION:
      return colorInformation;
  }
};
