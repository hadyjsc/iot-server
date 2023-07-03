import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { PermissionsService } from '../services/permissions.service';
import { CreatePermissionDto } from '../dtos/create-permission.dto';
import { UpdatePermissionDto } from '../dtos/update-permission.dto';
import { ResponseMessageTitle } from 'src/commons/decorators/response-message.decorator';
import { AccessTokenGuard } from 'src/commons/guard/access-token.guard';
import { CurrentUserDecorator } from 'src/commons/decorators/current-user.decorators';
import { SUCCESS_CREATED, FAILED_CREATED, SUCCESS_UPDATED, FAILED_GENERAL, SUCCESS_FETCH } from 'src/commons/constants';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @ResponseMessageTitle("Created")
  async create(@Body() createPermissionDto: CreatePermissionDto, @CurrentUserDecorator() user: any) {
    try {
      createPermissionDto.created_by = user.primary;
      const result = await this.permissionsService.create(createPermissionDto);
      let response = { result, success: true, message: SUCCESS_CREATED }
      return response
    } catch (error) {
      throw new HttpException(FAILED_CREATED, HttpStatus.INTERNAL_SERVER_ERROR, { cause: error }); 
    }
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  @ResponseMessageTitle("Successfuly")
  async findAll() {
    try {
      const result = await this.permissionsService.findAll();
      let response = { result, success: true, message: SUCCESS_FETCH }
      return response
    } catch (error) {
      throw new HttpException(FAILED_GENERAL, HttpStatus.INTERNAL_SERVER_ERROR, { cause: error }); 
    }
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  @ResponseMessageTitle("Successfuly")
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.permissionsService.findOne(id);
      let response = { result, success: true, message: SUCCESS_FETCH }
      return response
    } catch (error) {
      throw new HttpException(FAILED_GENERAL, HttpStatus.INTERNAL_SERVER_ERROR, { cause: error }); 
    }
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @ResponseMessageTitle("Successfuly")
  async update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto, @CurrentUserDecorator() user: any) {
    try {
      updatePermissionDto.updated_by = user.primary;
      const result = await this.permissionsService.update(id, updatePermissionDto);
      let response = { result, success: true, message: SUCCESS_UPDATED }
      return response
    } catch (error) {
      throw new HttpException(FAILED_GENERAL, HttpStatus.INTERNAL_SERVER_ERROR, { cause: error }); 
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(+id);
  }
}
