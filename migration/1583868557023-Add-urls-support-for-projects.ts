import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUrlsSupportForProjects1583868557023 implements MigrationInterface {
    name = 'AddUrlsSupportForProjects1583868557023'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ADD "urls" text array NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "urls"`, undefined);
    }

}
