/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { FeatureFlagService } from './featureflag.service';
import { SecurityService } from './security.service';
import { Mailer } from './mailer.service';

@Module({
    providers: [FeatureFlagService, SecurityService, Mailer],
    exports:[FeatureFlagService]
})
export class HelperModule {}
