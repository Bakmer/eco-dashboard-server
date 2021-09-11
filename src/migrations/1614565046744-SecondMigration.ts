import {MigrationInterface, QueryRunner} from "typeorm";

export class SecondMigration1614565046744 implements MigrationInterface {
    name = 'SecondMigration1614565046744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `transport` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `transport` ADD `name` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `transport` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `transport` ADD `name` int NOT NULL");
    }

}
