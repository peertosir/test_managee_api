import {MigrationInterface, QueryRunner} from "typeorm";

export class UsersProjectsModel1583798191379 implements MigrationInterface {
    name = 'UsersProjectsModel1583798191379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, "banned" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "status" character varying NOT NULL, "project_manager_id" integer, "responsible_qa_id" integer, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "project_qa_team_user" ("userId" integer NOT NULL, "projectId" integer NOT NULL, CONSTRAINT "PK_0a373244b8dfca42d61884110c1" PRIMARY KEY ("userId", "projectId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_8a671cfbd5938e4867f82ebc1b" ON "project_qa_team_user" ("userId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d174e9dc6f9fd2c4acc880c1b7" ON "project_qa_team_user" ("projectId") `, undefined);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_d7723d7da4e0a4a8dcfa1d676f4" FOREIGN KEY ("project_manager_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_c1b810136b3dd3939380cb7466e" FOREIGN KEY ("responsible_qa_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "project_qa_team_user" ADD CONSTRAINT "FK_8a671cfbd5938e4867f82ebc1b4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "project_qa_team_user" ADD CONSTRAINT "FK_d174e9dc6f9fd2c4acc880c1b76" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_qa_team_user" DROP CONSTRAINT "FK_d174e9dc6f9fd2c4acc880c1b76"`, undefined);
        await queryRunner.query(`ALTER TABLE "project_qa_team_user" DROP CONSTRAINT "FK_8a671cfbd5938e4867f82ebc1b4"`, undefined);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_c1b810136b3dd3939380cb7466e"`, undefined);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_d7723d7da4e0a4a8dcfa1d676f4"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d174e9dc6f9fd2c4acc880c1b7"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_8a671cfbd5938e4867f82ebc1b"`, undefined);
        await queryRunner.query(`DROP TABLE "project_qa_team_user"`, undefined);
        await queryRunner.query(`DROP TABLE "project"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}
