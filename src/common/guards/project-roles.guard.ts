import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProjectsService } from '../../projects/projects.service';
import { User } from '../../users/user.entity';
import { Project } from '../../projects/project.entity';

@Injectable()
export class ProjectRolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private projectService: ProjectsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const project = await this.projectService.getProjectById(request.params.project_id);
    const user = request.user;
    return this.matchRoles(roles, user, project);
  }

  matchRoles(roles: string[], user: User, project: Project): boolean {
    let hasAccess = false;
    roles.forEach(role => {
      if (
        (role == "qa_team" &&
        project[role].length != 0 &&
        project[role].filter(qas => qas.id == user.id).length != 0)
        ||
        (project[role] != null && project[role].id == user.id)
      ) {
        hasAccess = true;
        return
    }
  });
    return hasAccess;
  }
}