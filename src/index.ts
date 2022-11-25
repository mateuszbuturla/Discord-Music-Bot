import * as dotenv from 'dotenv';
import ExtendedClient from './client';
import { AppDataSource } from './config/dataSource';

dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    new ExtendedClient().init();
  })
  .catch((error) => console.log('Error: ', error));
