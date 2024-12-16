import { Type } from "class-transformer";
import { IsDate, IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreatePagoDto {
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    public idCliente: number;

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    public idCita: number;

    @IsDate()
    @Type(() => Date)
    public fechaPago: Date;

    @IsString()
    public metodoPago: string;

    @IsNumber({maxDecimalPlaces: 2})
    @Min(0)
    @Type(() => Number)
    public montoPago: number;

    @IsString()
    public estadoPago: string;
}
