import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const CurrentUserDecorator = createParamDecorator((data: any | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log(request);
    
    if (!data) {
        return request.user;
    }
    return request.user.data;
})