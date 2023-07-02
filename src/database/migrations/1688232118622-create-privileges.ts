import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreatePrivileges1688232118622 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "privileges",
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
                        isNullable: false
                    },
                    {
                        name: 'permission_id',
                        type: 'bigint',
                        unsigned: true,
                        isNullable: false
                    },
                    {
                        name: 'is_active',
                        type: 'boolean',
                        isNullable: false,
                        default: true
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
            }), true, true
        )

        await queryRunner.createForeignKey(
            "privileges",
            new TableForeignKey({
                name: 'fk_privileges_user_id_users_id',
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "RESTRICT"

            })
        )

        await queryRunner.createForeignKey(
            "privileges",
            new TableForeignKey({
                name: 'fk_privileges_permission_id_permissions_id',
                columnNames: ["permission_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "permissions",
                onUpdate: "NO ACTION",
                onDelete: "NO ACTION"

            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("privileges")
        const foreignKeyUser = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("user_id") !== -1
        )

        const foreignKeyPermission = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("permission_id") !== -1
        )

        await queryRunner.dropForeignKey("users", foreignKeyUser)
        await queryRunner.dropForeignKey("permissions", foreignKeyPermission)
        
        await queryRunner.dropTable('privileges')
    }

}
