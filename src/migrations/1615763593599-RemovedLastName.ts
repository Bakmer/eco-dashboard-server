import {MigrationInterface, QueryRunner} from "typeorm";

export class RemovedLastName1615763593599 implements MigrationInterface {
    name = 'RemovedLastName1615763593599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `billing` DROP COLUMN `last_name`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `billing` ADD `last_name` varchar(255) NOT NULL");
    }

}
