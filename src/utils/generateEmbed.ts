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
  description: string | Translate;
  fields?: Fields;
};

const getRawSingleFieldRow = async (
  fields: SingleFieldRow,
): Promise<APIEmbedField[]> => {
  let mappedFields: APIEmbedField[] = [];

  for (let field of fields) {
    const rawField: APIEmbedField = {
      name: await getRawText(field.name),
      value: await getRawText(field.value),
    };
    mappedFields = [...mappedFields, rawField];
  }

  return mappedFields;
};

const getRawFieldRows = async (fields: Fields): Promise<APIEmbedField[][]> => {
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

export const generateEmbed = async ({
  type = MessageType.SUCCESS,
  description,
  fields,
}: Options): Promise<EmbedBuilder> => {
  const botName = getBotName();

  const embed = new EmbedBuilder()
    .setColor(getColorByType(type))
    .setTitle(botName)
    .setDescription(await getRawText(description))
    .setTimestamp()
    .setFooter({
      text: botName,
    });

  if (fields) {
    const rawFields = await getRawFieldRows(fields);

    rawFields.map((fieldsRow) => {
      embed.addFields(fieldsRow);
    });
  }

  return embed;
};
