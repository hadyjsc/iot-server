import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Permission } from "../entities/permission.entity";
import { CreatePermissionDto } from "../dtos/create-permission.dto";
import { UpdatePermissionDto } from "../dtos/update-permission.dto";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PermissionRepository extends Repository<Permission> {
    constructor(private dataSource: DataSource) {
        super(Permission,dataSource.createEntityManager())
    }

    async insertData(data: CreatePermissionDto): Promise<Permission> {
        try {
            const insert = this.create({
                uuid: uuidv4(),
                name: data.name,
                type: data.type,
                feature_id: data.feature_id,
                is_active: data.is_active,
                created_at: new Date(),
                created_by: data.created_by
            })

            return await insert.save()
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async updateData(data: UpdatePermissionDto) : Promise<Permission> {
        try {
            const update = await this.createQueryBuilder().where('uuid = :uuid', {uuid: data.uuid}).getOne()
            if (update) {
                update.name = data.name
                update.type = data.type
                update.feature_id = data.feature_id
                update.is_active = data.is_active
                update.updated_at = new Date()
                update.updated_by = data.updated_by
                return await update.save()
            }

            return null
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async selectAll() : Promise<Permission[]> {
        try {
            const permissions = await this.find()
            return permissions
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async selectByUUID(uuid: string) : Promise<Permission> {
        try {
            const permission = await this.findOneBy({uuid})
            return permission
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}