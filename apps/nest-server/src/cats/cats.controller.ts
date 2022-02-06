import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dtos';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get('/:name')
  findByName(@Param('name') catName: string) {
    return this.catsService.findByName(catName);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.catsService.delete(id);
  }
}
