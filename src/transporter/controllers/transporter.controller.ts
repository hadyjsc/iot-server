import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransporterService } from '../services/transporter.service';
import { CreateTransporterDto } from '../dtos/create-transporter.dto';
import { UpdateTransporterDto } from '../dtos/update-transporter.dto';

@Controller()
export class TransporterController {
  constructor(private readonly transporterService: TransporterService) {}

  @MessagePattern('createTransporter')
  create(@Payload() createTransporterDto: CreateTransporterDto) {
    return this.transporterService.create(createTransporterDto);
  }

  @MessagePattern('findAllTransporter')
  findAll() {
    return this.transporterService.findAll();
  }

  @MessagePattern('findOneTransporter')
  findOne(@Payload() id: number) {
    return this.transporterService.findOne(id);
  }

  @MessagePattern('updateTransporter')
  update(@Payload() updateTransporterDto: UpdateTransporterDto) {
    return this.transporterService.update(updateTransporterDto.id, updateTransporterDto);
  }

  @MessagePattern('removeTransporter')
  remove(@Payload() id: number) {
    return this.transporterService.remove(id);
  }
}
