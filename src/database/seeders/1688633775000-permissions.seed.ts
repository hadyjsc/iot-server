import { MigrationInterface, QueryRunner } from "typeorm";

export default class PermissionSeed1688633775000 implements MigrationInterface {
    
    async up(queryRunner: QueryRunner): Promise<any> {
        let sql = `INSERT IGNORE INTO permissions (id, uuid, name, type, feature_id, is_active, created_at, created_by) VALUES
                    ('1', '9c4119ac-cc7a-4604-88bc-ecf75374062e', 'system.users.page', 'PAGE', '1', 'true', '2023-07-07T06:51:25.663Z', '0'),
                    ('2', '4f4c21f5-95d1-4b9f-88a9-8e858a801e53', 'system.users.table', 'TABLE', '1', 'true', '2023-07-07T06:51:25.663Z', '0'),
                    ('3', '1e49b2a5-434d-40c9-8c17-ae5a65823d95', 'system.users.filter', 'FILTER', '1', 'true', '2023-07-07T06:51:25.663Z', '0'),
                    ('4', '6d23af2a-c188-4a21-8806-5809312a0b7f', 'system.users.search', 'SEARCH', '1', 'true', '2023-07-07T06:51:25.663Z', '0'),
                    ('5', '090b762a-6219-44f0-93ab-bb98d52c9950', 'system.users.widget', 'WIDGET', '1', 'true', '2023-07-07T06:51:25.663Z', '0'),
                    ('6', '8c07bc7c-db17-4aa8-97b7-446322542a10', 'system.users.create', 'BUTTON', '1', 'true', '2023-07-07T06:51:25.663Z', '0'),
                    ('7', 'e4059ce2-e7db-4881-ad26-ea82a8e647a7', 'system.users.update', 'BUTTON', '1', 'true', '2023-07-07T06:51:25.663Z', '0'),
                    ('8', '3cf46724-c9f4-483b-a414-80629cb08bc6', 'system.users.delete', 'BUTTON', '1', 'true', '2023-07-07T06:51:25.663Z', '0'),
                    ('9', '1db721a5-2055-4b6e-845c-4b4709e1e2af', 'system.roles.page', 'PAGE', '2', 'true', '2023-07-07T06:51:25.663Z', '0'),
                    ('10', '38da6444-12d0-473d-bf14-293cfadb847f', 'system.roles.table', 'TABLE', '2', 'true', '2023-07-07T06:51:25.664Z', '0'),
                    ('11', 'e5f10ab1-a7f9-4d33-9327-83ce18d452b2', 'system.roles.filter', 'FILTER', '2', 'true', '2023-07-07T06:51:25.664Z', '0'),
                    ('12', '2e6b08ba-17b8-4460-b4eb-767567c0d5f1', 'system.roles.search', 'SEARCH', '2', 'true', '2023-07-07T06:51:25.664Z', '0'),
                    ('13', '178821ee-81ce-41b1-b85a-0d8d405b4c42', 'system.roles.create', 'BUTTON', '2', 'true', '2023-07-07T06:51:25.664Z', '0'),
                    ('14', '9b4d2a4e-cc94-481f-8e9b-5154e9d73d4b', 'system.roles.update', 'BUTTON', '2', 'true', '2023-07-07T06:51:25.664Z', '0'),
                    ('15', '337dafe8-43de-4ca2-81ac-e23328439f10', 'system.roles.delete', 'BUTTON', '2', 'true', '2023-07-07T06:51:25.664Z', '0'),
                    ('16', '0028521d-de98-4e1c-953a-19fbb099c970', 'system.permissions.page', 'PAGE', '2', 'true', '2023-07-07T06:51:25.664Z', '0'),
                    ('17', 'c9ea16d9-6f08-474e-92f9-d488f46ca782', 'system.permissions.table', 'TABLE', '2', 'true', '2023-07-07T06:51:25.664Z', '0'),
                    ('18', '7d2df810-7c3a-419c-b4d2-2bf8a1aad54a', 'system.permissions.filter', 'FILTER', '2', 'true', '2023-07-07T06:51:25.664Z', '0'),
                    ('19', '0090c8f3-8bff-43b6-8458-e55a84200d0d', 'system.permissions.search', 'SEARCH', '2', 'true', '2023-07-07T06:51:25.664Z', '0'),
                    ('20', '59a876f7-e16c-45eb-b7a8-aef672619559', 'system.permissions.create', 'BUTTON', '2', 'true', '2023-07-07T06:51:25.664Z', '0'),
                    ('21', '68750f6a-d8b1-45a6-98b1-a38de025b0ad', 'system.permissions.update', 'BUTTON', '2', 'true', '2023-07-07T06:51:25.664Z', '0'),
                    ('22', 'a40f15f6-4479-49a9-812c-59ee25257486', 'system.permissions.delete', 'BUTTON', '2', 'true', '2023-07-07T06:51:25.664Z', '0'),
                    ('23', '4b110d6a-4ae9-48d6-8b29-320e9bae44ff', 'system.privileges.page', 'PAGE', '2', 'true', '2023-07-07T06:51:25.664Z', '0'),
                    ('24', '91bfc002-eb53-4067-afcc-04406d2e27af', 'system.privileges.table', 'TABLE', '2', 'true', '2023-07-07T06:51:25.664Z', '0'),
                    ('25', 'c889388b-af9c-466e-b804-2bdd27037b3a', 'system.privileges.filter', 'FILTER', '2', 'true', '2023-07-07T06:51:25.664Z', '0'),
                    ('26', '7d066ec9-eebb-476e-bd77-9269fbeebaf3', 'system.privileges.search', 'SEARCH', '2', 'true', '2023-07-07T06:51:25.664Z', '0'),
                    ('27', '93f2a8f2-8cad-4a51-9817-c1ca1b64d6ff', 'system.privileges.create', 'BUTTON', '2', 'true', '2023-07-07T06:51:25.664Z', '0'),
                    ('28', 'f05edc19-9b1b-404a-98d0-016ab6a00f98', 'system.privileges.update', 'BUTTON', '2', 'true', '2023-07-07T06:51:25.664Z', '0'),
                    ('29', 'b31f0b78-e2ec-4597-ab99-8ebc48f9a122', 'system.privileges.delete', 'BUTTON', '2', 'true', '2023-07-07T06:51:25.664Z', '0');`

            await queryRunner.startTransaction()
            try {
                await queryRunner.query(sql)
                await queryRunner.commitTransaction()
            } catch (error) {
                await queryRunner.rollbackTransaction()
            }
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('TRUNCATE permissions')
    }
}