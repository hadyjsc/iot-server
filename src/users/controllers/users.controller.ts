import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { FAILED_CREATED, FAILED_GENERAL, FAILED_REGISTERED, SUCCESS_CREATED, SUCCESS_FETCH } from 'src/commons/constants';
import { AccessTokenGuard } from 'src/commons/guard/access-token.guard';
import { CurrentUserDecorator } from 'src/commons/decorators/current-user.decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      let response = { result:user, success: true, message: SUCCESS_CREATED }
      return response
    } catch (error) {
      throw new HttpException(FAILED_CREATED, HttpStatus.INTERNAL_SERVER_ERROR, { cause: error }); 
    }
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAll() {
    return this.usersService.getAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get(':email')
  async getUserByEmail(@Param('email') email: string) {
    try {
      const user = await this.usersService.getUserByEmail(email);
      let response = { result:user, success: true, message: SUCCESS_FETCH }
      return response
    } catch (error) {
      throw new HttpException(FAILED_REGISTERED, HttpStatus.INTERNAL_SERVER_ERROR, { cause: error }); 
    }
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/me/:id/privilege')
  async privilege(@Param('id') id: string, @CurrentUserDecorator() user: any) {
    try {
      if (id == user.id) {
        const privilege = await this.usersService.getUserPrivilege(user);
        let response = { result:privilege, success: true, message: SUCCESS_FETCH }
      return response
      } else {
        throw new HttpException(FAILED_GENERAL, HttpStatus.FORBIDDEN, {cause: new Error('Access denied.')})
      }
    } catch (error) {
      throw new HttpException(FAILED_GENERAL, HttpStatus.INTERNAL_SERVER_ERROR, { cause: error }); 
    }
  }
}
