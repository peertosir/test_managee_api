import {IsArray, IsNumber, IsObject, IsOptional, IsString} from "class-validator";

export class UpdateProjectDto {
    @IsString()
    @IsOptional()
    title: string;
    @IsString()
    @IsOptional()
    description: string;
    @IsOptional()
    @IsNumber()
    project_manager: number;
    @IsArray()
    @IsOptional()
    qa_team: number[];
    @IsNumber()
    @IsOptional()
    responsible_qa: number;
}