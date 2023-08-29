import { PartialType } from '@nestjs/mapped-types';
import { CreateRieltorDto } from './create-rieltor.dto';
import { IsEmail, IsString } from 'class-validator';

export class UpdateRieltorDto extends PartialType(CreateRieltorDto) {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  hashedPassword: string;
}
