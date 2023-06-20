import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateRoles1686902542833 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "roles",
                columns: [
                    {
                        name: 'id',
                        type: 'bigint',
                        unsigned: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isPrimary: true,
                    },
                    {
                        name: 'uuid',
                        type: 'varchar',
                        length: '50',
                        isNullable: false,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'alias',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'created_at',
                        type: 'datetime',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'created_by',
                        type: 'bigint',
                        unsigned: true,
                        isNullable: true,
                    },
                    {
                        name: 'updated_at',
                        type: 'datetime',
                        isNullable: true,
                    },
                    {
                        name: 'updated_by',
                        type: 'bigint',
                        unsigned: true,
                        isNullable: true,
                    },
                    {
                        name: 'deleted_at',
                        type: 'datetime',
                        isNullable: true,
                    },
                    {
                        name: 'deleted_by',
                        type: 'bigint',
                        unsigned: true,
                        isNullable: true,
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
