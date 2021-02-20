import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangedNamesOfColumns1613828249060 implements MigrationInterface {
    name = 'ChangedNamesOfColumns1613828249060'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `createdAt`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `updatedAt`");
        await queryRunner.query("ALTER TABLE `user` ADD `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `user` ADD `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `updated_at`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `created_at`");
        await queryRunner.query("ALTER TABLE `user` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `user` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

}
