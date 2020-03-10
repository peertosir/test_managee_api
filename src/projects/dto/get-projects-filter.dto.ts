import {IsIn, IsNotEmpty, IsOptional} from "class-validator";
import {ProjectStatusEnum} from "../project-status.enum";

export class GetProjectsFilterDto {

    @IsOptional()
    @IsIn([
        ProjectStatusEnum.IDLE,
        ProjectStatusEnum.TESTING,
        ProjectStatusEnum.FINISHED
    ])
    status: ProjectStatusEnum;
    @IsOptional()
    @IsNotEmpty()
    search: string;
}