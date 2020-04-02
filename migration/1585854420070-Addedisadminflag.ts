import {MigrationInterface, QueryRunner} from "typeorm";

export class Addedisadminflag1585854420070 implements MigrationInterface {
    name = 'Addedisadminflag1585854420070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "urls" SET DEFAULT '{}'::text[]`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_admin" boolean NOT NULL DEFAULT false`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "urls" SET DEFAULT '{}'`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_admin" boolean NOT NULL DEFAULT false`, undefined);
    }

}
