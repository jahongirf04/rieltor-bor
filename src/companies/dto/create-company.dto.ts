import { IsString } from "class-validator";

export class CreateCompanyDto {
    @IsString()
    readonly owner_name: string
}
