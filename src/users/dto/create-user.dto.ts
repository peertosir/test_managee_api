import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsEmail()
    email: string;
    @IsString()
    @IsNotEmpty()
    firstName: string;
    @IsString()
    @IsNotEmpty()
    lastName: string;
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password: string;
}