import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateVehicleDto {
    @IsString()
    @IsNotEmpty()
    make: string;

    @IsString()
    @IsNotEmpty()
    model: string;

    @IsString()
    @IsNotEmpty()
    year: number;

    @IsString()
    @IsNotEmpty()
    mileage: number;

    @IsString()
    @IsNotEmpty()
    description: string;
}
