import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import IEnvConfigInterface from '../interfaces/IEnvConfig.interface';
import { join } from 'path';
import { SnakeNamingStrategy } from './snake-naming.strategy';

@Injectable()
export class ConfigService implements TypeOrmOptionsFactory {
    private readonly envConfig: IEnvConfigInterface;

    get(key: string): string {
        if (this.envConfig) return this.envConfig[key];
        return process.env[key];
    }

    getInt(key: string): number {
        if (this.envConfig) return parseInt(this.envConfig[key], 10);
        return parseInt(process.env[key], 10);
    }

    getBoolean(key: string): boolean {
        if (this.envConfig) return this.envConfig[key] === 'true';
        return process.env[key] === 'true';
    }

    createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        const baseDir = join(__dirname, '../');
        
        const entitiesPath = `${baseDir}${process.env.TYPEORM_ENTITIES}`;
        const migrationPath = `${baseDir}${process.env.TYPEORM_MIGRATIONS}`;
        const type: any = process.env.TYPEORM_CONNECTION;
        
        return {
            type,
            host: process.env.TYPEORM_HOST,
            username: process.env.TYPEORM_USERNAME,
            password: process.env.TYPEORM_PASSWORD,
            database: process.env.TYPEORM_DATABASE,
            port: Number.parseInt(process.env.TYPEORM_PORT, 10),
            logging: false,
            entities: [entitiesPath],
            migrations: [migrationPath],
            namingStrategy: new SnakeNamingStrategy(),
            migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
        }
    }
}
