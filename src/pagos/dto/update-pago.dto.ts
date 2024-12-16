import { PartialType } from '@nestjs/mapped-types';
import { CreatePagoDto } from './create-pago.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdatePagoDto extends PartialType(CreatePagoDto) 
{
    @IsNumber()
    @IsPositive()
    id: number;
}
