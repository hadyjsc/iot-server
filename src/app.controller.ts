import { Controller, Get } from '@nestjs/common';
import { Interface } from 'readline';
import { FeatureFlagService } from './commons/helpers/featureflag.service';

@Controller()
export class AppController {
  constructor(private featureFlag: FeatureFlagService) { 
    this.featureFlag = featureFlag
  }

  @Get("health-check")
  healthCheck() {
    // var flag = this.featureFlag.get("TEST")
    // console.log(flag);
    
    let response = {
      success : true,
      message : 'How are you ?',
      statusCode: 200
    }
    return response;
  }
}
