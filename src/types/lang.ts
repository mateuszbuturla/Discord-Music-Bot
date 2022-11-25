export enum Language {
  en = 'en',
  pl = 'pl',
}

export interface Translate {
  key: string;
  args?: { [key: string]: string | number };
}
