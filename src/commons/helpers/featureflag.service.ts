/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class FeatureFlagService {
    private readonly environment: string;

    get(flag = null, explicit = false): boolean {
        console.log(flag, this.environment);
        
        if (!explicit && (process.env.APP_ENV === 'development' || process.env.APP_ENV === 'local')) {
            return true;
        }
        
        return ['true', '1', 'True', 'TRUE', true, 1].includes(this.environment[flag])
    }
}
