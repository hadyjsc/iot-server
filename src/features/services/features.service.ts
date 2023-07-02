import { Injectable } from '@nestjs/common';
import { CreateFeatureDto } from '../dtos/create-feature.dto';
import { UpdateFeatureDto } from '../dtos/update-feature.dto';
import { FeaturesRepository } from '../repositories/features.repositories';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class FeaturesService {
  constructor(
    private readonly repository: FeaturesRepository,
    private readonly userService: UsersService) {}

  create(createFeatureDto: CreateFeatureDto) {
    return this.repository.insertData(createFeatureDto)
  }

  findAll() {
    return this.repository.selectAll()
  }

  findOne(uuid: string) {
    return this.repository.selectByUUID(uuid)
  }

  update(id: string, updateFeatureDto: UpdateFeatureDto) {
    updateFeatureDto.uuid = id
    return this.repository.updateData(updateFeatureDto);
  }

  remove(id: number) {
    return `This action removes a #${id} feature`;
  }
}
