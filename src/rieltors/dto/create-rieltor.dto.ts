import { IsEmail, IsString } from "class-validator";

export class CreateRieltorDto {
    @IsString()
    @IsEmail()
    email: string

    @IsString()
    hashedPassword: string
}
