import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuid } from "uuid"

export default class FeatureSeed1688627922000 implements MigrationInterface {
    
    async up(queryRunner: QueryRunner): Promise<any> {
        const data = [
            {
                id: 1,
                uuid: uuid(),
                name: 'User Management',
                owner: 'SYSTEM',
                is_active: true,
                created_at: new Date(),
                created_by: 0
            },
            {
                id: 2,
                uuid: uuid(),
                name: 'Authorization',
                owner: 'SYSTEM',
                is_active: true,
                created_at: new Date(),
                created_by: 0
            }
        ]

        data.forEach(async (e) => {
            await queryRunner.startTransaction()
            try {
                await queryRunner.connection.createQueryBuilder().insert().into('features').values({
                    id: e.id,
                    uuid: e.uuid,
                    name: e.name,
                    owner: e.owner,
                    is_active: e.is_active,
                    created_at: e.created_at,
                    created_by: e.created_by
                }).orIgnore(`("id") DO NOTHING`).execute()
                await queryRunner.commitTransaction()
            } catch (error) {
                await queryRunner.rollbackTransaction()   
            }
        });

    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('TRUNCATE features')
    }
}