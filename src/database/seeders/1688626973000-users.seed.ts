import { v4 as uuid } from "uuid"
import * as bcrypt from "bcrypt";
import { MigrationInterface, QueryRunner } from "typeorm";

export default class UsersSeed1688626973000 implements MigrationInterface {
    
    
    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.startTransaction()
        try {
            await queryRunner.connection.createQueryBuilder().insert().into('users').values({
                id: 1,
                uuid: uuid(),
                email: 'super@admin.localhost',
                first_name: 'Super',
                last_name: 'Admin',
                status: 1,
                password: bcrypt.hashSync('super12345', 14),
                role_id: 1,
                created_at: new Date(),
                created_by: 0
            }).orIgnore(`("id") DO NOTHING`).execute()
            await queryRunner.commitTransaction()
        } catch (error) {
            await queryRunner.rollbackTransaction()
        }
    }
    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('TRUNCATE users')
    }

}