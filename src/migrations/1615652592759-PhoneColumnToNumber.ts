import {MigrationInterface, QueryRunner} from "typeorm";

export class PhoneColumnToNumber1615652592759 implements MigrationInterface {
    name = 'PhoneColumnToNumber1615652592759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `phone` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `phone` ADD `name` int NOT NULL");
        await queryRunner.query("ALTER TABLE `phone` DROP COLUMN `area_code`");
        await queryRunner.query("ALTER TABLE `phone` ADD `area_code` int NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `phone` DROP COLUMN `area_code`");
        await queryRunner.query("ALTER TABLE `phone` ADD `area_code` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `phone` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `phone` ADD `name` varchar(255) NOT NULL");
    }

}
