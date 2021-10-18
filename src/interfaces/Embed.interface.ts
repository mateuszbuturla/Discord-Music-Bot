export enum EmbedType {
  SUCCESS,
  ERROR,
}

export interface EmbedOptions {
  type: EmbedType;
  description: string;
  footer?: string;
}
