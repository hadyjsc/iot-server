import { Controller, Get, HttpException, HttpStatus, InternalServerErrorException, Post, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransporterService } from '../services/transporter.service';
import { CreateTransporterDto, SendMessage } from '../dtos/create-transporter.dto';
import { UpdateTransporterDto } from '../dtos/update-transporter.dto';
import { AccessTokenGuard } from 'src/commons/guard/access-token.guard';

@Controller('transporters')
export class TransporterController {
  constructor(private readonly transporterService: TransporterService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  async sendMessage(@Payload() data: SendMessage) {
    try {
      const sent = this.transporterService.sendMessage(data)
    
    } catch (error) {
      throw new HttpException('Error Publish Message', HttpStatus.INTERNAL_SERVER_ERROR, { cause: error }); 
    }
  }

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
