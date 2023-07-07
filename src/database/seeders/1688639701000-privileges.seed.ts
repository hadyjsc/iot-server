import { MigrationInterface, QueryRunner } from "typeorm";

export default class PrivilegeSeed1688639701000 implements MigrationInterface {
    
    async up(queryRunner: QueryRunner): Promise<any> {
        let sql = `INSERT IGNORE INTO privileges (id, uuid, user_id, permission_id, is_active, created_at, created_by) VALUES
                    (1, '7cad6660-e33b-458f-81de-9e7d82a06989', '1', '1', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (2, 'd7495d35-3de9-4d35-9807-e4b5797edfa3', '1', '2', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (3, 'e5b7d362-d109-4fc1-b65d-a0fb97d26326', '1', '3', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (4, 'd7d0a3c3-60f2-43c8-86f1-48f626ff8b7d', '1', '4', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (5, '6457efa5-b8a9-4136-9115-bef1c80a8f64', '1', '5', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (6, 'bfcfa539-6531-429c-8cf3-439f0cc9a8ca', '1', '6', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (7, '04b25009-5d2f-4cef-ae82-89636732f471', '1', '7', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (8, 'bd829740-4bc2-4cb9-86f7-99c21db07574', '1', '8', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (9, 'f740d99d-51bc-4c7e-9ade-c157c6c664c9', '1', '9', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (10, '5172499f-77ec-4122-9d7a-7ea877ddc779', '1', '10', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (11, 'c073c998-789f-45d1-9ea3-71100afde2bd', '1', '11', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (12, '6865ae88-38a3-4a52-ba53-46d36b554d5b', '1', '12', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (13, '08a6d9bd-6701-4058-9c3d-a2945d5fcc8d', '1', '13', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (14, '11a3ce4c-b1da-4abd-a510-4b8a29a61b0b', '1', '14', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (15, 'c5c2703a-29a3-4637-8605-baf0ad7219c9', '1', '15', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (16, '5d58cc57-bff9-4dfc-8bc1-61d8d88682b7', '1', '16', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (17, 'e25ea4c9-11da-4585-b22c-6e3cdccdc5b4', '1', '17', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (18, '28c6579d-06cc-48a2-a621-54cc108bb8c0', '1', '18', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (19, 'fe9ddc5d-7678-45ee-880f-9bdf9b950f88', '1', '19', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (20, '0d3b9105-fdc5-43dd-982b-e7b098ea1e5e', '1', '20', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (21, '73f4a509-3340-4025-8785-880eb8e57b0b', '1', '21', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (22, 'e6615d7c-6504-456f-8c95-0b653be3acf5', '1', '22', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (23, 'de112b43-091e-4d78-8a25-dc9723bec7ef', '1', '23', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (24, 'f81ea59d-12d0-44b6-b625-4a82260c9bf4', '1', '24', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (25, '2391620a-4255-453f-9c2f-db196fdaef5e', '1', '25', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (26, 'bc8a2323-2e91-4b72-9fb0-13906e32cf4f', '1', '26', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (27, '886e447f-31e8-4ab0-ad49-c0dcda4430c3', '1', '27', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (28, 'b74cbf1d-861e-49f1-910f-68f1519e2810', '1', '28', 'true', '2023-07-07T06:41:04.494Z', '0'),
                    (29, 'bfbc0ca7-f9ce-457d-ab52-27feaa50d824', '1', '29', 'true', '2023-07-07T06:41:04.494Z', '0');`
            await queryRunner.startTransaction()
            try {
                await queryRunner.query(sql)
                await queryRunner.commitTransaction()
            } catch (error) {
                await queryRunner.rollbackTransaction()
            }
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('TRUNCATE privileges')
    }
}