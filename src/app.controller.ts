import { Controller, Get } from '@nestjs/common';
import { Interface } from 'readline';
import { FeatureFlagService } from './commons/helpers/featureflag.service';
import { PublicAPI } from './commons/decorators/public-api.decorators';

@Controller()
export class AppController {
  constructor(private featureFlag: FeatureFlagService) { 
    this.featureFlag = featureFlag
  }

  @PublicAPI()
  @Get()
  healthCheck() {
    let response = {
      success : true,
      message : 'Server it\'s works!!',
      result: {
        app: process.env.APP_NAME,
        version: process.env.VERSION
      },
      status_code: 200
    }

    return response;
  }
}
