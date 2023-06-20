import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateUsers1686910584822 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns:[
                {
                    name: 'id',
                    type: 'bigint',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'uuid',
                    type: 'varchar',
                    length: '50',
                    isNullable: false,
                },
                {
                    name: 'first_name',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'middle_name',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'last_name',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'role_id',
                    type: 'bigint',
                    unsigned: true,
                    isNullable: true,
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum:[ '0', '1', '-1', '2', '-2'],
                    comment: 'registered (0), active (1), inactive (-1), blocked (-2)',
                    default: '"0"',
                    isNullable: false,
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
        }))

        await queryRunner.createForeignKey(
            "users",
            new TableForeignKey({
                name: 'fk_users_role_id_roles_id',
                columnNames: ["role_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "roles",
                onDelete: "RESTRICT"

            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("users")
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("role_id") !== -1
        )

        await queryRunner.dropForeignKey("users", foreignKey)
        await queryRunner.dropTable('users')
    }

}
