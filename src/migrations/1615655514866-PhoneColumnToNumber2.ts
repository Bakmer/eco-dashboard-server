import {MigrationInterface, QueryRunner} from "typeorm";

export class PhoneColumnToNumber21615655514866 implements MigrationInterface {
    name = 'PhoneColumnToNumber21615655514866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `phone` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `phone` ADD `name` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `phone` DROP COLUMN `phone`");
        await queryRunner.query("ALTER TABLE `phone` ADD `phone` int NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `phone` DROP COLUMN `phone`");
        await queryRunner.query("ALTER TABLE `phone` ADD `phone` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `phone` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `phone` ADD `name` int NOT NULL");
    }

}
