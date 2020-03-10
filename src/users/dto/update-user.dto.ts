import {IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength} from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsEmail()
    @IsOptional()
    email: string;
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    firstName: string;
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    lastName: string;
}