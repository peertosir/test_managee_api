import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedIsAdminFlag1585847034096 implements MigrationInterface {
    name = 'AddedIsAdminFlag1585847034096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "urls" SET DEFAULT '{}'::text[]`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "urls" SET DEFAULT '{}'`, undefined);
    }

}
