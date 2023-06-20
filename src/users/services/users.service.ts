import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto, CreateUserFromRegistrationDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { RegistrationDto } from 'src/authentication/dtos/register.dto';
import { Connection } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly runner: Connection
  ) {

  }

  async createUserFromRegistration(register: RegistrationDto): Promise<UserEntity> {
    let user: UserEntity

    const queryRunner = this.runner.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      let model = new CreateUserFromRegistrationDto()
      model = register

      let query = await this.userRepository.createUserRegistration(model)
      user = await queryRunner.manager.save(query)
      await queryRunner.commitTransaction()
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw new InternalServerErrorException(error)
    } finally {
      await queryRunner.release()
    }

    return user
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.selectAll()
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.selectUserByEmail(email)
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
