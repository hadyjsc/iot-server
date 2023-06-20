import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from '../dtos/create-auth.dto';
import { UpdateAuthDto } from '../dtos/update-auth.dto';
import { RegistrationDto } from '../dtos/register.dto';
import { SecurityService } from 'src/commons/helpers/security.service';
import { UsersService } from 'src/users/services/users.service';
import { MailerDto } from 'src/commons/dtos/mailer.dto';
import { Mailer } from 'src/commons/helpers/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private security : SecurityService, 
    private readonly usersService: UsersService,
    private readonly mailer: Mailer
  ) {}

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
