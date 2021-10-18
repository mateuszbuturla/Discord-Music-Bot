import { EmbedType } from "../interfaces/Embed.interface";

export const getColor = (type: EmbedType): string => {
  switch (type) {
    case EmbedType.SUCCESS:
      return "GREEN";
    case EmbedType.ERROR:
      return "RED";
  }
};
