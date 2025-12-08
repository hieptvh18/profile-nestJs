import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MeService } from './me.service';
import { CreateMeDto } from './dto/create-me.dto';
import { UpdateMeDto } from './dto/update-me.dto';

@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMeDto: CreateMeDto) {
    return this.meService.create(createMeDto);
  }

  @Get()
  findAll(@Query('search') search?: string) {
    if (search) {
      return this.meService.search(search);
    }
    return this.meService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.meService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMeDto: UpdateMeDto,
  ) {
    return this.meService.update(id, updateMeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.meService.remove(id);
  }
}
