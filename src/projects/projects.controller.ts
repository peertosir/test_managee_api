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
import {ProjectStatusValidationPipe} from "./pipes/project.status.validation.pipe";
import {Project} from "./project.entity";
import {ProjectStatusEnum} from "./project-status.enum";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../auth/decorators/get-user.decorator";
import {User} from "../users/user.entity";
import {UpdateProjectDto} from "./dto/update-project.dto";
import {UsersService} from "../users/users.service";


@Controller('api/projects')
@UseGuards(AuthGuard())
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


    @Get('/:id')
    getProjectById(@Param('id', ParseIntPipe) id:number): Promise<Project>  {
        return this.projectsService.getProjectById(id);
    };


    @Delete('/:id')
    deleteProject(@Param('id', ParseIntPipe) id:number): Promise<void> {
        return this.projectsService.deleteProject(id);
    }


    @Patch('/:id/update_status')
    updateProjectStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', ProjectStatusValidationPipe) status: ProjectStatusEnum
    ) {
        return this.projectsService.updateProjectStatus(id, status);
    }


    @Patch('/:id')
    updateProject(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) updateProjectDto: UpdateProjectDto
    ) {
        return this.projectsService.updateProject(id, updateProjectDto);
    }
}
