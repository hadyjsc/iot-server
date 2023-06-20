

import * as path from 'path';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config( {path:path.join(process.cwd(), `.cold.env`)} )

const baseDir = path.join(__dirname, '../');
const entitiesPath = `${baseDir}${process.env.TYPEORM_ENTITIES}`;

const migrationPath = `${baseDir}${process.env.TYPEORM_MIGRATIONS}`;
console.log("Dir", migrationPath);
const type: any = process.env.TYPEORM_CONNECTION
export default new DataSource( {
  type,
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: Number.parseInt(process.env.TYPEORM_PORT, 10),
  logger: 'simple-console',
//   entities: [entitiesPath],
  migrations: [migrationPath],
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true'
});