import {IsEmail, IsString, MaxLength, MinLength} from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password: string;
}