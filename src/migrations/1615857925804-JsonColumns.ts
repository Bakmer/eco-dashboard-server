import {MigrationInterface, QueryRunner} from "typeorm";

export class JsonColumns1615857925804 implements MigrationInterface {
    name = 'JsonColumns1615857925804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shipping` DROP COLUMN `province`");
        await queryRunner.query("ALTER TABLE `shipping` ADD `province` json NOT NULL");
        await queryRunner.query("ALTER TABLE `shipping` DROP COLUMN `location`");
        await queryRunner.query("ALTER TABLE `shipping` ADD `location` json NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shipping` DROP COLUMN `location`");
        await queryRunner.query("ALTER TABLE `shipping` ADD `location` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `shipping` DROP COLUMN `province`");
        await queryRunner.query("ALTER TABLE `shipping` ADD `province` varchar(255) NOT NULL");
    }

}
