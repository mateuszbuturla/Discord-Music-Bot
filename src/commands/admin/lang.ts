import { generateEmbed } from '../../utils';
import { error } from '../../components';
import { changeServerLanguage } from '../../entities';
import { ICommand, Language, MessageType } from '../../types';
import { checkIfEnumIncludesValue } from '../../helpers';

const args = [
  {
    name: 'command.lang.args.language',
    required: true,
  },
];

export const command: ICommand = {
  name: 'lang',
  descriptionKey: 'command.lang.help-description',
  aliases: [],
  args,
  adminOnly: true,
  run: async (client, message, args) => {
    if (!checkIfEnumIncludesValue(Language, args[0])) {
      return error(message, { key: 'error.language-not-exist' });
    }

    const lang = Language[args[0] as Language];

    const result = await changeServerLanguage(message.guildId as string, lang);

    if (!result) {
      return error(message, {
        key: 'error.server-error',
      });
    }

    const embed = await generateEmbed({
      type: MessageType.SUCCESS,
      description: { key: 'command.lang.success', args: { lang } },
      lang,
    });

    message.channel.send({ embeds: [embed] });
  },
};
