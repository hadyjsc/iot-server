import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Feature } from "../entities/feature.entity";
import { CreateFeatureDto } from "../dtos/create-feature.dto";
import { v4 as uuidv4 } from 'uuid';
import { UpdateFeatureDto } from "../dtos/update-feature.dto";

@Injectable()
export class FeaturesRepository extends Repository<Feature> {
    constructor(private dataSource: DataSource) {
        super(Feature, dataSource.createEntityManager())
    }

    async insertData(data: CreateFeatureDto): Promise<Feature> {
        try {
            const insert = this.create({
                uuid: uuidv4(),
                name: data.name,
                owner: data.owner,
                created_at: new Date(),
                created_by: data.created_by
            })

            return await insert.save()
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async updateData(data: UpdateFeatureDto): Promise<Feature> {
        try {
            const update = await this.createQueryBuilder().where('uuid = :uuid', {uuid: data.uuid}).getOne()
            if (update) {
                update.name = data.name
                update.owner = data.owner
                update.is_active = data.is_active
                update.updated_by = data.updated_by
                update.updated_at = new Date()
                return await update.save()
            }

            return null
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async selectAll(): Promise<Feature[]> {
        try {
            return await this.find()
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async selectByUUID(uuid: string): Promise<Feature> {
        try {
            return await this.findOneBy({uuid: uuid})
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}