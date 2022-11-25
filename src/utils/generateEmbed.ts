import { Language } from './../types/lang';
import { APIEmbedField, EmbedBuilder } from 'discord.js';
import { getBotName } from '../helpers';
import { MessageType, Translate } from '../types';
import { getColorByType } from './getColorByType';
import { getRawText } from './getRawText';

type CustomField = {
  name: string | Translate;
  value: string | Translate;
  inline?: boolean;
};

type SingleFieldRow = CustomField[];
type FieldRows = SingleFieldRow[];

type Fields = FieldRows | SingleFieldRow;

type Options = {
  type?: MessageType;
  description?: string | Translate;
  fields?: Fields;
  lang: Language;
};

export const generateEmbed = async ({
  type = MessageType.SUCCESS,
  description,
  fields,
  lang,
}: Options): Promise<EmbedBuilder> => {
  const botName = getBotName();

  const getRawSingleFieldRow = async (
    fields: SingleFieldRow,
  ): Promise<APIEmbedField[]> => {
    let mappedFields: APIEmbedField[] = [];

    for (let field of fields) {
      const rawField: APIEmbedField = {
        name: await getRawText(field.name, lang),
        value: await getRawText(field.value, lang),
      };
      mappedFields = [...mappedFields, rawField];
    }

    return mappedFields;
  };

  const getRawFieldRows = async (
    fields: Fields,
  ): Promise<APIEmbedField[][]> => {
    if (fields.length === 0) {
      return [];
    }

    if (Array.isArray(fields[0])) {
      let mappedRows: APIEmbedField[][] = [];

      for (let row of fields as FieldRows) {
        let mappedFields = await getRawSingleFieldRow(row);

        mappedRows = [...mappedRows, mappedFields];
      }

      return mappedRows;
    }

    let mappedFields = await getRawSingleFieldRow(fields as SingleFieldRow);

    return [mappedFields];
  };

  const embed = new EmbedBuilder()
    .setColor(getColorByType(type))
    .setTitle(botName)
    .setTimestamp()
    .setFooter({
      text: botName,
    });

  if (description) {
    embed.setDescription(await getRawText(description, lang));
  }

  if (fields) {
    const rawFields = await getRawFieldRows(fields);

    rawFields.map((fieldsRow) => {
      embed.addFields(fieldsRow);
    });
  }

  return embed;
};
