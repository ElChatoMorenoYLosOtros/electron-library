import { IsBoolean, IsDate, IsInt, IsOptional } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateReserveDto {
  @ApiProperty()
  @IsInt()
  clientId: number;

  @ApiProperty()
  @IsInt()
  materialId: number;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  checkDate?: Date;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  returnDate?: Date | null;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  returned?: boolean;

  @ApiProperty()
  @IsInt()
  adminID: number;
}
