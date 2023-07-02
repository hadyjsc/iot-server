import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreatePermissions1688200155005 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "permissions",
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
                        name: 'type',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'feature_id',
                        type: 'bigint',
                        unsigned: true,
                        isNullable: true,
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
            }), true, true,
        )

        await queryRunner.createForeignKey(
            "permissions",
            new TableForeignKey({
                name: 'fk_permission_feature_id_features_id',
                columnNames: ["feature_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "features",
                onUpdate: 'NO ACTION',
                onDelete: "NO ACTION"

            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("permissions")
        const foreignKeyFeature = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("feature_id") !== -1
        )

        await queryRunner.dropForeignKey("features", foreignKeyFeature)

        await queryRunner.dropTable('permissions')
    }

}
