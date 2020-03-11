import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {ProjectStatusEnum} from "./project-status.enum";
import {User} from "../users/user.entity";
import {Transform} from "class-transformer";

@Entity()
export class Project extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    status: ProjectStatusEnum;
    @Column("text", {array: true, default: '{}'})
    urls: string[];

    @ManyToOne(type => User, user => user.pm_projects, {eager: true})
    @JoinColumn({ name: "project_manager_id" })
    project_manager: User;

    @ManyToOne(type => User, user => user.responsible_qa_projects, {eager: true})
    @JoinColumn({ name: "responsible_qa_id" })
    responsible_qa: User;

    @ManyToMany(type => User, user => user.qa_team_projects)
    @JoinTable({name: "project_qa_team_user"})
    qa_team: User[];
}