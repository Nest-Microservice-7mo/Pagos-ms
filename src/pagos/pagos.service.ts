import { HttpStatus, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PagosService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Servicio Service')

  onModuleInit() {
    this.$connect();
    this.logger.log('Base de Datos Conectada');
  }

  create(createPagoDto: CreatePagoDto) {
    return this.pago.create({
      data: createPagoDto
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalPages = await this.pago.count();
    const lastPage = Math.ceil(totalPages / limit);

    if(page > lastPage) {
      return {
        message: `La página ${page} no existe`,
        meta: {
          total: totalPages,
          page: page,
          lastPage: lastPage
        }
      }
    }

    return {
      data: await this.pago.findMany({
        skip: (page - 1) * limit,
        take: limit        
      }),
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage,
      }
    }
  }

  async findOne(id: number) {
    const pago = await this.pago.findFirst({where:{id}})
    if (!pago) {
      throw new RpcException({
        message: `Pago con ID #${id} no encontrado`,
        status: HttpStatus.BAD_REQUEST
      });
    }
    return pago;
  }

  async update(id: number, updatePagoDto: UpdatePagoDto) {
    await this.findOne(id);
    const { id:__, ...data } = updatePagoDto;
    const pago = await this.pago.update({
      where: {id},
      data: data
    });
    return pago;
  }

  async remove(id: number) {
    await this.findOne(id);
    const pago = await this.pago.update({
      where: {id},
      data: {estadoPago: "Cancelado"}
    });
    return pago;
  }
}
