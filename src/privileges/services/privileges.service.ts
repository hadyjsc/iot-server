import { Injectable } from '@nestjs/common';
import { CreatePrivilegeDto } from '../dtos/create-privilege.dto';
import { UpdatePrivilegeDto } from '../dtos/update-privilege.dto';
import { PrivilegeRepository } from '../repositories/privilege.repository';
import { isArray } from 'class-validator';
import {v4 as uuidv4} from "uuid"

@Injectable()
export class PrivilegesService {
  constructor (private readonly repository: PrivilegeRepository) {
    
  }

  async create(createPrivilegeDto: CreatePrivilegeDto) {
    let payload = []
    if (isArray(createPrivilegeDto.permission_id)) {
      const permission = createPrivilegeDto.permission_id
      for (const item of permission) {
        payload.push({
          uuid: uuidv4(),
          user_id: createPrivilegeDto.user_id,
          permission_id: item,
          is_active: createPrivilegeDto.is_active,
          created_at: new Date(),
          created_by: createPrivilegeDto.created_by
        })
      }
    } else {
      payload.push({
        uuid: uuidv4(),
          user_id: createPrivilegeDto.user_id,
          permission_id: createPrivilegeDto.permission_id,
          is_active: createPrivilegeDto.is_active,
          created_at: new Date(),
          created_by: createPrivilegeDto.created_by
      })
    }
    
    const created = await this.repository.insertData(payload)
    return created
  }

  async findAll() {
    const privileges = await this.repository.selectAll()
    return privileges;
  }

  async findOne(id: string) {
    const privilege = await this.repository.selectByUUID(id)
    return privilege;
  }

  async update(id: string, updatePrivilegeDto: UpdatePrivilegeDto) {
    updatePrivilegeDto.uuid = id
    const updated = await this.repository.updateData(updatePrivilegeDto)
    return updated;
  }

  remove(id: number) {
    return `This action removes a #${id} privilege`;
  }
}
