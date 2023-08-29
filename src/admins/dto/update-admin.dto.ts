import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @ApiProperty({ example: 'admin1', description: 'Admin emaili' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'qwerty', description: 'Admin paroli' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
