import * as dotenv from 'dotenv';
import ExtendedClient from './client';

dotenv.config();

new ExtendedClient().init();
