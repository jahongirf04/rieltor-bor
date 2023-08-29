import { isEmpty } from "rxjs";
import {IsEmail, IsNotEmpty, IsString} from "class-validator"
import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
  @ApiProperty({ example: 'user1', description: 'emaili' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'qwerty', description: 'paroli' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
