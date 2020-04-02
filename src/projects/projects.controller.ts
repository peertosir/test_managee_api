import {
    Body, ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch, Post,
    Query, UseGuards, UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import {ProjectsService} from "./projects.service";
import {CreateProjectDto} from "./dto/create-project.dto";
import {GetProjectsFilterDto} from "./dto/get-projects-filter.dto";
import {ProjectStatusValidationPipe} from "../common/pipes/project.status.validation.pipe";
import {Project} from "./project.entity";
import {ProjectStatusEnum} from "./data/project-status.enum";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../common/decorators/get-user.decorator";
import {User} from "../users/user.entity";
import {UpdateProjectDto} from "./dto/update-project.dto";
import { ProjectRolesGuard } from '../common/guards/project-roles.guard';
import { Roles } from '../common/decorators/roles.decorator';


@Controller('api/projects')
@UseGuards(AuthGuard(), ProjectRolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ProjectsController {

    constructor(private projectsService: ProjectsService) {}

    @Get()
    getProjects(@Query(ValidationPipe) filterDto: GetProjectsFilterDto): Promise<Project[]>{
        return this.projectsService.getProjects(filterDto)
    }


    @Post()
    @UsePipes(ValidationPipe)
    createProject(
        @Body() createProjectDto: CreateProjectDto,
        @GetUser() user:User
    ): Promise<Project> {
        return this.projectsService.createProject(createProjectDto, user);
    };


    @Get('/:project_id')
    @Roles('qa_team', 'project_manager', 'responsible_qa')
    getProjectById(@Param('project_id', ParseIntPipe) id:number): Promise<Project>  {
        return this.projectsService.getProjectById(id);
    };


    @Delete('/:project_id')
    @Roles('project_manager')
    deleteProject(@Param('project_id', ParseIntPipe) id:number): Promise<void> {
        return this.projectsService.deleteProject(id);
    }


    @Patch('/:project_id/update_status')
    @Roles('qa_team', 'project_manager', 'responsible_qa')
    updateProjectStatus(
        @Param('project_id', ParseIntPipe) id: number,
        @Body('status', ProjectStatusValidationPipe) status: ProjectStatusEnum
    ): Promise<Project> {
        return this.projectsService.updateProjectStatus(id, status);
    }


    @Patch('/:project_id')
    @Roles('qa_team', 'project_manager', 'responsible_qa')
    updateProject(
        @Param('project_id', ParseIntPipe) id: number,
        @Body(ValidationPipe) updateProjectDto: UpdateProjectDto
    ): Promise<Project> {
        return this.projectsService.updateProject(id, updateProjectDto);
    }
}
