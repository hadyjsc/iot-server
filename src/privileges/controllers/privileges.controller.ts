import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { PrivilegesService } from '../services/privileges.service';
import { CreatePrivilegeDto } from '../dtos/create-privilege.dto';
import { UpdatePrivilegeDto } from '../dtos/update-privilege.dto';
import { ResponseMessageTitle } from 'src/commons/decorators/response-message.decorator';
import { AccessTokenGuard } from 'src/commons/guard/access-token.guard';
import { CurrentUserDecorator } from 'src/commons/decorators/current-user.decorators';
import { SUCCESS_CREATED, FAILED_CREATED, FAILED_GENERAL, SUCCESS_FETCH, SUCCESS_UPDATED } from 'src/commons/constants';

@Controller('privileges')
export class PrivilegesController {
  constructor(private readonly privilegesService: PrivilegesService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @ResponseMessageTitle("Created")
  async create(@Body() createPrivilegeDto: CreatePrivilegeDto, @CurrentUserDecorator() user: any) {
    try {
      createPrivilegeDto.created_by = user.primary;
      const result = await this.privilegesService.create(createPrivilegeDto);
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
      const result = await this.privilegesService.findAll();
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
      const result = await this.privilegesService.findOne(id);
      let response = { result, success: true, message: SUCCESS_FETCH }
      return response
    } catch (error) {
      throw new HttpException(FAILED_GENERAL, HttpStatus.INTERNAL_SERVER_ERROR, { cause: error }); 
    }
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @ResponseMessageTitle("Successfuly")
  async update(@Param('id') id: string, @Body() updatePrivilegeDto: UpdatePrivilegeDto, @CurrentUserDecorator() user: any) {
    try {
      updatePrivilegeDto.updated_by = user.primary;
      const result = await this.privilegesService.update(id, updatePrivilegeDto);
      let response = { result, success: true, message: SUCCESS_UPDATED }
      return response
    } catch (error) {
      throw new HttpException(FAILED_GENERAL, HttpStatus.INTERNAL_SERVER_ERROR, { cause: error }); 
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.privilegesService.remove(+id);
  }
}
