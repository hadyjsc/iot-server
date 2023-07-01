import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { AuthEntity } from "../entities/auth.entity";
import { CreateAuthDto } from "../dtos/create-auth.dto";
import { UserEntity } from "src/users/entities/user.entity";
import { UpdateAuthDto } from "../dtos/update-auth.dto";

@Injectable()
export class AuthRepository extends Repository<AuthEntity> {
    constructor(private dataSource: DataSource) {
        super(AuthEntity, dataSource.createEntityManager())
    }

    async createToken(data: CreateAuthDto) {
        try {
            let user = new UserEntity()
            user.id = data.user_id

            const userIdExist = await this.createQueryBuilder().where({user_id: data.user_id}).getOne()
            if (!userIdExist) {
                const create = this.create({
                    user_id: user,
                    token: data.token,
                    refresh_token: data.refresh_token
                })
    
                return this.save(create)
            } else {
                userIdExist.token = data.token
                userIdExist.refresh_token = data.refresh_token
                userIdExist.save()
    
                return userIdExist.save()
            }
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async deleteToken(userID: number): Promise<any> {
        try {
            let auth = await this.createQueryBuilder().where('user_id = :userID', {userID}).andWhere('token is not null').getOne()
            if (auth) {
                auth.token = null
                auth.refresh_token = null
                return await auth.save()
            } 
            
            return false
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async refreshToken(data: UpdateAuthDto) {
        try {
            let update = this.createQueryBuilder().update().set({
                token: data.token,
                refresh_token: data.refresh_token
            }).where({ user_id: data.user_id })

            return update
        } catch (error) {
            return error
        }
    }

    async findByUserIDAndRefresh(userID: number, refresh: string) {
        try {
            return this.createQueryBuilder().select().where({ user_id: userID, refresh_token: refresh })
        } catch (error) {
            return error
        }
    }
}