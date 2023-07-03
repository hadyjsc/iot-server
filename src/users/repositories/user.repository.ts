import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { CreateUserFromRegistrationDto } from "../dtos/create-user.dto";
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class UserRepository extends Repository<UserEntity> {
    constructor(private dataSource: DataSource) {
        super(UserEntity, dataSource.createEntityManager())
    }

    async selectAll() {
        return this.find()
    }

    async selectUserByID(id: number) {
        return this.findOneBy({ id })
    }

    async selectUserByEmail(email: string) {
        return this.findOneBy({ email })
    }

    async selectUserByUUID(uuid: string) {
        return this.findOneBy({ uuid })
    }

    async createUserRegistration(data: CreateUserFromRegistrationDto) {
        try {
            let create = this.create({
                email: data.email,
                uuid: uuidv4(),
                password: data.password,
                first_name: data.first_name,
                middle_name: data.middle_name,
                last_name: data.last_name
            })
    
            return this.save(create)
        } catch (error) {
            return error
        }
    }

    async selectUserPrivilege(id: string, email: string) {
        try {
            const sql = `SELECT
                u.uuid as uID,
                u.status as uStatus,
                r.uuid as rID,
                r.name as rName,
                r.alias as rAlias,
                p.uuid as pID,
                p.is_active as pIsActive,
                p2.uuid as p2ID,
                p2.name as p2Name,
                p2.type as p2Type,
                p2.is_active as p2IsActive,
                f.uuid as fID,
                f.name as fName,
                f.is_active as fIsActive
            from
                users u
            left join roles r on u.role_id = r.id
            left join privileges p on u.id  = p.user_id 
            left join permissions p2 on p.permission_id = p2.id 
            left join features f on p2.feature_id = f.id
            where u.uuid = ? and u.email = ?;`

            const privilege = await this.dataSource.query(sql, [id, email])
            return privilege
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}