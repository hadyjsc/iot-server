import { Controller, Get } from '@nestjs/common';
import { Interface } from 'readline';

@Controller()
export class AppController {
  constructor() { }

  @Get("health-check")
  healthCheck() {
    let response = {
      success : true,
      message : 'How are you ?',
      statusCode: 200
    }
    return response;
  }
}
