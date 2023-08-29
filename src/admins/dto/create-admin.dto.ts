import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAdminDto {
  @ApiProperty({ example: 'admin1@gmail.com', description: 'Admin emaili' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'qwerty', description: 'Admin passwordi' })
  @IsEmail()
  readonly password: string;
}
