import { Injectable } from "@nestjs/common";
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
}