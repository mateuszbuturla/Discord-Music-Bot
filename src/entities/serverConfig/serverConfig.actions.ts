import { Language } from '../../types';
import { ServerConfigEntity } from './serverConfig.entity';

export const generateServerRecord = async (
  guildId: string,
): Promise<ServerConfigEntity> => {
  const server = await ServerConfigEntity.findOne({ where: { guildId } });

  if (!server) {
    const newServer = new ServerConfigEntity();
    newServer.guildId = guildId;
    return await newServer.save();
  }

  return server;
};

export const getServerLanguage = async (guildId: string): Promise<Language> => {
  const findServer = await ServerConfigEntity.findOne({ where: { guildId } });

  if (!findServer) {
    return Language.en;
  }

  return findServer.lang;
};
