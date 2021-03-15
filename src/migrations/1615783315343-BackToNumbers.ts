import {MigrationInterface, QueryRunner} from "typeorm";

export class BackToNumbers1615783315343 implements MigrationInterface {
    name = 'BackToNumbers1615783315343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `phone` DROP COLUMN `area_code`");
        await queryRunner.query("ALTER TABLE `phone` ADD `area_code` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `phone` DROP COLUMN `phone`");
        await queryRunner.query("ALTER TABLE `phone` ADD `phone` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `phone` DROP COLUMN `phone`");
        await queryRunner.query("ALTER TABLE `phone` ADD `phone` int NOT NULL");
        await queryRunner.query("ALTER TABLE `phone` DROP COLUMN `area_code`");
        await queryRunner.query("ALTER TABLE `phone` ADD `area_code` int NOT NULL");
    }

}
