import {BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique} from "typeorm";
import * as bcrypt from 'bcrypt';
import {Project} from "../projects/project.entity";
import {Exclude} from "class-transformer";

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    @Exclude()
    password: string;
    @Column()
    @Exclude()
    salt: string;

    @Column({default:false})
    banned: boolean;

    @OneToMany(type => Project, project => project.project_manager, {eager: false})
    pm_projects: Project[];

    @OneToMany(type => Project, project => project.responsible_qa, {eager: false})
    responsible_qa_projects: Project[];

    @ManyToMany(type => Project, project => project.qa_team)
    @JoinTable({name: "project_qa_team_user"})
    qa_team_projects: Project[];

    async validatePassword(password:string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
}