import { SetMetadata } from "@nestjs/common";

export const PublicAPI = () => SetMetadata('isPublic', true);