export enum Language {
  en = 'en',
}

export interface Translate {
  key: string;
  args?: { [key: string]: string | number };
}
