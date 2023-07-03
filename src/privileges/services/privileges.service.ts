import { Injectable } from '@nestjs/common';
import { CreatePrivilegeDto } from '../dtos/create-privilege.dto';
import { UpdatePrivilegeDto } from '../dtos/update-privilege.dto';
import { PrivilegeRepository } from '../repositories/privilege.repository';

@Injectable()
export class PrivilegesService {
  constructor (private readonly repository: PrivilegeRepository) {
    
  }

  async create(createPrivilegeDto: CreatePrivilegeDto) {
    const created = await this.repository.insertData(createPrivilegeDto)
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
