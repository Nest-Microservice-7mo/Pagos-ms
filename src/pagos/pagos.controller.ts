import { Controller, ParseIntPipe } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  //@Post()
  @MessagePattern({cmd: 'create_pago'})
  create(@Payload() createPagoDto: CreatePagoDto) {
    return this.pagosService.create(createPagoDto);
  }

  //@Get()
  @MessagePattern({cmd: 'find_all_pagos'})
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.pagosService.findAll(paginationDto);
  }

  //@Get(':id')
  @MessagePattern({cmd: 'find_one_pago'})
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.pagosService.findOne(id);
  }

  //@Patch(':id')
  @MessagePattern({cmd: 'update_pago'})
  update(@Payload() updatePagoDto: UpdatePagoDto) {
    return this.pagosService.update(updatePagoDto.id, updatePagoDto);
  }

  //@Delete(':id')
  @MessagePattern({cmd: 'delete_pago'})
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.pagosService.remove(id);
  }
}
