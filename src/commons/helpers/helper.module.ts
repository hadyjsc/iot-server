/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { FeatureFlagService } from './featureflag.service';

@Module({
    providers: [FeatureFlagService],
    exports:[FeatureFlagService]
})
export class HelperModule {}
