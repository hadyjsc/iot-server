import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePermissionDto } from '../dtos/create-permission.dto';
import { UpdatePermissionDto } from '../dtos/update-permission.dto';
import { PermissionRepository } from '../repositories/permission.repository';

@Injectable()
export class PermissionsService {
  constructor(private readonly repository: PermissionRepository) {
  }
  async create(createPermissionDto: CreatePermissionDto) {
    try {
      const { service, feature, entity, action } = createPermissionDto
      createPermissionDto.name = `${service}.${feature}.${entity}`
      if (action) {
        createPermissionDto.name = `${createPermissionDto.name}.${action}`
      }
      
      const create = await this.repository.insertData(createPermissionDto)
      return create
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    try {
      const find = await this.repository.selectAll()
      return find
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(uuid: string) {
    try {
      const find = await this.repository.selectByUUID(uuid)
      return find
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto) {
    try {
      const { service, feature, entity, action } = updatePermissionDto
      updatePermissionDto.name = `${service}.${feature}.${entity}`
      if (action) {
        updatePermissionDto.name = `${updatePermissionDto.name}.${action}`
      }

      updatePermissionDto.uuid = id
      const update = await this.repository.updateData(updatePermissionDto)
      return update
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }

  async checkUserPermission(permissionName: string, userID: number) : Promise<boolean> {
    try {
      const exist = await this.repository.userPermissionIsExist(permissionName, userID)
      return exist
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
