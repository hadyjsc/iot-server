import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex, TableUnique } from "typeorm"

export class CreateAuthentications1686926814640 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'authentications',
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
                        name: 'user_id',
                        type: 'bigint',
                        unsigned: true,
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: 'otp',
                        type: 'tinyint',
                        isNullable: true,
                        isUnique: true,
                    },
                    {
                        name: 'two_factor_secret',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'two_factor_recovery_code',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'token',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'refresh_token',
                        type: 'text',
                        isNullable: true,
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
            }),
            true,
            true
        )

        await queryRunner.createForeignKey(
            "authentications",
            new TableForeignKey({
                name: 'fk_authentication_user_id_users_id',
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "RESTRICT"

            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("authentications")
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("user_id") !== -1
        )

        await queryRunner.dropForeignKey("authentications", foreignKey)
        await queryRunner.dropTable('authentications')
    }
}
