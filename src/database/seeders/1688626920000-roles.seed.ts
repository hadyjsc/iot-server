import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuid } from "uuid"

export default class RoleSeed1688626920000 implements MigrationInterface {
    
    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.startTransaction()
        try {
            await queryRunner.connection.createQueryBuilder().insert().into('roles').values({
                id: 1,
                uuid: uuid(),
                name: 'Super Admin',
                alias: 'super',
                created_at: new Date(),
                created_by: 0
            }).orIgnore(`("id") DO NOTHING`).execute()
            await queryRunner.commitTransaction()
        } catch (error) {
            await queryRunner.rollbackTransaction()
        }
    }
    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('TRUNCATE roles')
    }
}