import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Privilege } from "../entities/privilege.entity";
import { CreatePrivilegeDto } from "../dtos/create-privilege.dto";
import { UpdatePrivilegeDto } from "../dtos/update-privilege.dto";
import {v4 as uuidv4} from "uuid"

@Injectable()
export class PrivilegeRepository extends Repository<Privilege> {
    constructor(private dataSource: DataSource) {
        super(Privilege, dataSource.createEntityManager())
    }

    async insertData(data: any): Promise<any> {
        try {
            const insert = this.createQueryBuilder().insert().values(data)

            return await insert.execute()
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async updateData(data: UpdatePrivilegeDto): Promise<Privilege> {
        try {
            const update = await this.createQueryBuilder().where('uuid = :uuid', {uuid: data.uuid}).getOne()
            if (update) {
                update.user_id = data.user_id
                update.permission_id = data.permission_id
                update.is_active = data.is_active
                update.updated_at = new Date()
                update.updated_by = data.updated_by

                return await update.save()
            }
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async selectAll(): Promise<Privilege[]> {
        try {
            const privileges = await this.find()
            return privileges
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async selectByUUID(uuid: string): Promise<Privilege> {
        try {
            const privilege = await this.findOneBy({uuid})
            return privilege
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}