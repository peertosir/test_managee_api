import {EntityRepository, Repository} from "typeorm";
import {Project} from "./project.entity";
import {CreateProjectDto} from "./dto/create-project.dto";
import {ProjectStatusEnum} from "./data/project-status.enum";
import {GetProjectsFilterDto} from "./dto/get-projects-filter.dto";
import {User} from "../users/user.entity";

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {

    async createProject(createProjectDto: CreateProjectDto, user: User): Promise<Project> {
        const project = new Project();
        project.title = createProjectDto.title;
        project.description = createProjectDto.description;
        project.status = ProjectStatusEnum.IDLE;
        project.project_manager = user;
        project.qa_team = [user, ];
        project.urls = [];
        await project.save();

        return project;
    }

    async getProjects(filterDto: GetProjectsFilterDto): Promise<Project[]> {
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('project');
        if (status) {
            query.andWhere('project.status = :status', {status})
        }
        if (search) {
            query.andWhere(
                '(project.title LIKE :search OR project.description LIKE :search)',
                {search: `%${search}%`}
                )
        }
        return await query.getMany();
    }
}