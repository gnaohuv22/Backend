import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";


export class AuthRegisterDto {

    @ApiProperty({ type: String})
    @IsNotEmpty()
    name: string;

    @ApiProperty({ type: String})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ type: String})
    @IsNotEmpty()
    password: string;
}