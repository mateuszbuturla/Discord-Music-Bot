import { DataSource } from 'typeorm';
import { ServerConfigEntity } from '../entities';

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: process.env.MYSQL_HOST,
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  entities: [ServerConfigEntity],
});
