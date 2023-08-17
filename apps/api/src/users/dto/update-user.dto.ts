import { IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';
import { PartialType } from '@nestjs/swagger';
import CreateUserDto from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  direction: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone: string;
}
