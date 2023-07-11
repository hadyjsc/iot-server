import { Inject, Injectable } from '@nestjs/common';
import { CreateTransporterDto, SendMessage } from '../dtos/create-transporter.dto';
import { UpdateTransporterDto } from '../dtos/update-transporter.dto';
import { Client, Packet, Payload, PigeonService, Subscription, Topic, onClient, onClientReady, onPreConnect, onPublish, onSubscribe } from 'pigeon-mqtt-nest';

@Injectable()
export class TransporterService {
  constructor(@Inject(PigeonService) private readonly aedesService: PigeonService) {

  }

  @onClient()
  OnNewClient(@Client() Client) {
    console.log("Function: @onClient", Client.id);
  }

  @onClientReady()
  async onClientReady(@Client() client) {
    // console.log("Function: @onClientReady()");
  }

  @onSubscribe()
  OnSubscribe(@Subscription() subscription, @Client() client) {
    // console.log("Function: @OnSubscribe()", subscription, client.id);
  }

  @onPublish()
  async OnPublish(@Topic() topic, @Packet() packet, @Payload() payload, @Client() client) {
    console.log("Function: @OnPublish()", payload);
  }

  async sendMessage(data: SendMessage) {
    const sent = await this.aedesService.publish({
      topic: process.env.TEST_MESSAGE,
      qos: 0,
      cmd: "publish",
      payload: JSON.stringify(data),
      dup: false,
      retain: false
    })
    return sent
  }

  create(createTransporterDto: CreateTransporterDto) {
    return 'This action adds a new transporter';
  }

  findAll() {
    return `This action returns all transporter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transporter`;
  }

  update(id: number, updateTransporterDto: UpdateTransporterDto) {
    return `This action updates a #${id} transporter`;
  }

  remove(id: number) {
    return `This action removes a #${id} transporter`;
  }
}
