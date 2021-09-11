import {MigrationInterface, QueryRunner} from "typeorm";

export class DeleteColumnAdded1614906556141 implements MigrationInterface {
    name = 'DeleteColumnAdded1614906556141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `deleted_at` datetime(6) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `deleted_at`");
    }

}
