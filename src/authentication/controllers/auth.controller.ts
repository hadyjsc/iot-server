import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateAuthDto } from '../dtos/create-auth.dto';
import { UpdateAuthDto } from '../dtos/update-auth.dto';
import { RegistrationDto } from '../dtos/register.dto';
import { ResponseMessage } from 'src/commons/decorators/response-message.decorator';
import {  FAILED_REGISTERED, SUCCESS_REGISTERED } from 'src/commons/constants';
import { Mailer } from 'src/commons/helpers/mailer.service';
import { MailerDto } from 'src/commons/dtos/mailer.dto';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  async registration(@Body() data: RegistrationDto ){
    try {
      const result = await this.authService.registration(data)
      let response = { result, success: true, message: SUCCESS_REGISTERED }
      return response
    } catch (error) {
      throw new HttpException(FAILED_REGISTERED, HttpStatus.INTERNAL_SERVER_ERROR, { cause: error }); 
    }
  }

  @Post('/login')
  async login(@Body() data: LoginDto) {
    
  }

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
