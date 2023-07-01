import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { FAILED_REGISTERED, SUCCESS_FETCH } from 'src/commons/constants';
import { AccessTokenGuard } from 'src/commons/guard/access-token.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

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
}
