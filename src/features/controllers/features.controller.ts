import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, Req } from '@nestjs/common';
import { FeaturesService } from '../services/features.service';
import { CreateFeatureDto } from '../dtos/create-feature.dto';
import { UpdateFeatureDto } from '../dtos/update-feature.dto';
import { AccessTokenGuard } from 'src/commons/guard/access-token.guard';
import { SUCCESS_CREATED, FAILED_CREATED, FAILED_GENERAL, SUCCESS_FETCH, SUCCESS_UPDATED } from 'src/commons/constants';
import { ResponseMessageTitle } from 'src/commons/decorators/response-message.decorator';
import { CurrentUserDecorator } from 'src/commons/decorators/current-user.decorators';

@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @ResponseMessageTitle("Created")
  async create(@Body() createFeatureDto: CreateFeatureDto, @CurrentUserDecorator() user: any) {
    try {
      createFeatureDto.created_by = user.primary;
      const result = await this.featuresService.create(createFeatureDto);
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
      const result = await this.featuresService.findAll();
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
      const result = await this.featuresService.findOne(id);
      let response = { result, success: true, message: SUCCESS_FETCH }
      return response
    } catch (error) {
      throw new HttpException(FAILED_GENERAL, HttpStatus.INTERNAL_SERVER_ERROR, { cause: error }); 
    }
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFeatureDto: UpdateFeatureDto, @CurrentUserDecorator() user: any) {
    try {
      updateFeatureDto.updated_by = user.primary;
      const result = await this.featuresService.update(id, updateFeatureDto);
      let response = { result, success: true, message: SUCCESS_UPDATED }
      return response
    } catch (error) {
      throw new HttpException(FAILED_GENERAL, HttpStatus.INTERNAL_SERVER_ERROR, { cause: error }); 
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.featuresService.remove(+id);
  }
}
