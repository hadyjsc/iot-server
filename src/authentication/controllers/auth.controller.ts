import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, HttpCode, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateAuthDto } from '../dtos/create-auth.dto';
import { UpdateAuthDto } from '../dtos/update-auth.dto';
import { RegistrationDto } from '../dtos/register.dto';
import {  FAILED_GENERAL, FAILED_REGISTERED, SUCCESS_FETCH, SUCCESS_REGISTERED } from 'src/commons/constants';
import { LoginDto } from '../dtos/login.dto';
import { AccessTokenGuard } from 'src/commons/guard/access-token.guard';
import { RefreshTokenGuard } from 'src/commons/guard/refresh-token.guard';
import { PublicAPI } from 'src/commons/decorators/public-api.decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicAPI()
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

  @PublicAPI()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: LoginDto) {
    try {
      const token = await this.authService.login(data)
      let response = { result: token, success: true, message: SUCCESS_FETCH }
      return response
    } catch (error) {
      throw new HttpException(FAILED_REGISTERED, HttpStatus.FORBIDDEN, { cause: error }); 
    }
  }

  @UseGuards(AccessTokenGuard)
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() data: Request) {
    try {
      const loggedOut = await this.authService.logout(data['user'])
      if (!loggedOut) {
        throw new HttpException('Not allowed.', HttpStatus.FORBIDDEN)
      } else {
        return { success: true, message:  'Logged out successfuly.' , messageTitle: 'Success'}
      }
    } catch (error) {
      throw new HttpException(FAILED_GENERAL, HttpStatus.INTERNAL_SERVER_ERROR, { cause: error }); 
    }
  }

  @UseGuards(RefreshTokenGuard)
  @Post('/token/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Req() req: Request) {
    try {
      const user = req['user'];
      let token = await this.authService.refreshToken(user['id'], req.headers.get('authorization').replace('Bearer', '').trim())
    } catch (error) {
      throw new HttpException(FAILED_GENERAL, HttpStatus.BAD_REQUEST, { cause: error }); 
    }
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
