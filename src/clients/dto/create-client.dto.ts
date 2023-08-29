import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateClientDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  password: string
}
