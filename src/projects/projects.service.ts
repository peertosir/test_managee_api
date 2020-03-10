import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateProjectDto} from "./dto/create-project.dto";
import {ProjectRepository} from "./project.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Project} from "./project.entity";
import {ProjectStatusEnum} from "./project-status.enum";
import {GetProjectsFilterDto} from "./dto/get-projects-filter.dto";
import {User} from "../users/user.entity";
import {UpdateProjectDto} from "./dto/update-project.dto";
import {UsersService} from "../users/users.service";

@Injectable()
export class ProjectsService {

    constructor(
        @InjectRepository(ProjectRepository)
        private projectRepository:ProjectRepository,
        private usersService:UsersService) {}


    async getProjectById(id: number): Promise<Project> {
        const found = await this.projectRepository.findOne({id: id},{relations: ['qa_team']});
        if (!found) {
            throw new NotFoundException(`Project with id ${id} was not found`);
        }
        return found;
    }


    async getProjects(filterDto: GetProjectsFilterDto): Promise<Project[]> {
        return this.projectRepository.getProjects(filterDto);
    }


    async createProject(createProjectDto: CreateProjectDto, user: User): Promise<Project> {
        return this.projectRepository.createProject(createProjectDto, user);
    }


    async deleteProject(id: number): Promise<void> {
        const result = await this.projectRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Task not exist')
        }
    }


    async updateProjectStatus(id: number, status: ProjectStatusEnum): Promise<Project> {
        const result = await this.getProjectById(id);
        result.status = status;
        await result.save();
        return result;
    }


    async updateProject(id: number, updateProjectDto: UpdateProjectDto) {
        const project = await this.getProjectById(id);
        const {title, description, project_manager, responsible_qa, qa_team} = updateProjectDto;
        if (project_manager) {
            project.project_manager = await this.usersService.getUserById(project_manager);
        }
        if (responsible_qa) {
            project.responsible_qa = await this.usersService.getUserById(responsible_qa);
        }
        if (qa_team) {
            project.qa_team = await this.usersService.getUsersById(qa_team);
        }
        if (title) {
            project.title = title;
        }
        if (description) {
            project.description = description;
        }

        await project.save();
        return project;
    }
}
