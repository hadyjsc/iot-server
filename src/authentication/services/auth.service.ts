import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from '../dtos/create-auth.dto';
import { UpdateAuthDto } from '../dtos/update-auth.dto';
import { RegistrationDto } from '../dtos/register.dto';
import { SecurityService } from 'src/commons/helpers/security.service';
import { UsersService } from 'src/users/services/users.service';
import { MailerDto } from 'src/commons/dtos/mailer.dto';
import { Mailer } from 'src/commons/helpers/mailer.service';
import { LoginDto } from '../dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private security: SecurityService,
    private readonly usersService: UsersService,
    private readonly mailer: Mailer,
    private jwtService: JwtService,
    private readonly authRepository: AuthRepository
  ) { }

  async registration(data: RegistrationDto) {
    data.email = data.email.toLowerCase()
    data.password = await this.security.generatePassword(data.password)

    let register = this.usersService.createUserFromRegistration(data)

    if (register) {
      let email = new MailerDto()
      email = {
        subject: 'Verify Your E-Mail Now!',
        mail_to: data.email,
        template: './example',
        template_data: {
          name: `${data.first_name} ${data.middle_name} ${data.last_name}`
        }
      }
      try {
        await this.mailer.send(email)
      } catch (error) {
        console.log(error);
      }

    }

    return register
  }

  async login(data: LoginDto) {
    const userDetail = await this.usersService.getUserByEmail(data.email)
    if (userDetail != null) {
      let verified = await this.security.verifyPassword(data.password, userDetail.password)
      if (!verified) {
        throw new ForbiddenException("username and password doesn't match.")
      }

      const jwtPayload = {
        id: userDetail.uuid,
        email: userDetail.email,
        name: {
          first: userDetail.first_name,
          middle: userDetail.middle_name,
          last: userDetail.last_name,
        },
        role: userDetail.role
      }

      const token = await this.getTokens(jwtPayload)
      await this.createToken(userDetail.id, token.access_token, token.refresh_token)

      return token
    } else {
      throw new UnauthorizedException("username / email not found.")
    }
  }

  async logout(data: any) {
    try {
      const getUserID = await this.usersService.findByUUID(data.id);
      if (!getUserID) {
        throw new UnauthorizedException("invalid user id")
      }

      const deleteToken = await this.authRepository.deleteToken(getUserID.id)
      return deleteToken;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  validateUserCredential(data: LoginDto): Promise<any> {
    const userDetail = this.usersService.getUserByEmail(data.email)
    return userDetail
  }

  async getTokens(payload: any) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: `${process.env.JWT_SECRET}`,
        expiresIn: '1d'
      }),
      this.jwtService.signAsync(payload, {
        secret: `${process.env.JWT_REFRESH_SECRET}`,
        expiresIn: '1w'
      })
    ])

    return { access_token, refresh_token }
  }

  async createToken(userID: number, token: string, refresh: string) {
    let data = new CreateAuthDto()
    data = {
      user_id: userID,
      token,
      refresh_token: await this.security.generatePassword(refresh) 
    }

    return await this.authRepository.createToken(data)
  }

  async refreshToken(userID: number, refresh: string) {
    let check = await this.usersService.findByUserID(userID)
    if (!check) {
      throw new ForbiddenException("User unauthorized.")
    }

    let checkAuth = await this.authRepository.findByUserIDAndRefresh(check.id, refresh)
    if (!checkAuth) {
      throw new ForbiddenException("Access denied.")
    }

    let verified = await this.security.verifyPassword(refresh, checkAuth.refresh_token)
    if (!verified) {
      throw new ForbiddenException("Invalid refresh token")
    }

    const jwtPayload = {
      id: check.uuid,
      email: check.email,
      name: {
        first: check.first_name,
        middle: check.middle_name,
        last: check.last_name,
      },
      role: check.role
    }

    const token = await this.getTokens(jwtPayload)

    let dto = new UpdateAuthDto()
    dto.user_id = userID
    dto.token = token.access_token
    dto.refresh_token = token.refresh_token
    let updated = await this.authRepository.refreshToken(dto)
    if (!updated) {
      throw new InternalServerErrorException("Can't update the data [ token, refresh_token ] on authentications table")
    }

    return token
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
