

import * as path from 'path';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config( {path:path.join(process.cwd(), `.cold.env`)} )

const baseDir = path.join(__dirname, '../');
const seedsPath = `${baseDir}${process.env.TYPEORM_SEEDS}`;

const type: any = process.env.TYPEORM_CONNECTION
export default new DataSource({
  type,
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: Number.parseInt(process.env.TYPEORM_PORT, 10),
  synchronize: false,
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
  migrations: [seedsPath],
  migrationsTableName: 'seeders'
});