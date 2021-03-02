import {MigrationInterface, QueryRunner} from "typeorm";

export class ThirdMigration1614645568938 implements MigrationInterface {
    name = 'ThirdMigration1614645568938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `phone` DROP COLUMN `area_code_1`");
        await queryRunner.query("ALTER TABLE `phone` DROP COLUMN `phone_1`");
        await queryRunner.query("ALTER TABLE `phone` ADD `area_code` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `phone` ADD `phone` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `phone` DROP COLUMN `phone`");
        await queryRunner.query("ALTER TABLE `phone` DROP COLUMN `area_code`");
        await queryRunner.query("ALTER TABLE `phone` ADD `phone_1` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `phone` ADD `area_code_1` varchar(255) NOT NULL");
    }

}
