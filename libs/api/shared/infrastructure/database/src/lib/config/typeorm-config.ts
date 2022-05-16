import dotenv from 'dotenv';
import { join, normalize } from 'path';

const envPath = normalize(
  join(__dirname, '../../../../../../../../apps/api/.env')
);
const migrationsPath = normalize(join(__dirname, '../migrations'));

dotenv.config({ path: envPath });

export default {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['**/*.entity.ts'],
  cli: {
    migrationsDir: migrationsPath,
  },
};
