import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dtos';
import { Cat } from './interfaces';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get('/:name')
  @HttpCode(HttpStatus.OK)
  findByName(@Param('name') catName: string): Promise<Cat> {
    return this.catsService.findByName(catName);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): Promise<void> {
    return this.catsService.delete(id);
  }
}
