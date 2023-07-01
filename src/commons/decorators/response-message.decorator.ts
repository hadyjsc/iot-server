import {  SetMetadata } from '@nestjs/common';

export const ResponseMessage = (message: string) => SetMetadata('response_message', message);
export const ResponseMessageTitle = (title: string) => SetMetadata('message_title', title);