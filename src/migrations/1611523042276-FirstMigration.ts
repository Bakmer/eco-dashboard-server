import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstMigration1611523042276 implements MigrationInterface {
    name = 'FirstMigration1611523042276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `stores` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_a205ca5a37fa5e10005f003aaf` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `status` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_95ff138b88fdd8a7c9ebdb97a3` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `name` varchar(255) NULL, `last_name` varchar(255) NULL, `password` varchar(255) NOT NULL, `storeId` int NOT NULL, `roleId` int NOT NULL, `statusId` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `roles` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_648e3f5447f725579d7d4ffdfb` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_c82cd4fa8f0ac4a74328abe997a` FOREIGN KEY (`storeId`) REFERENCES `stores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_368e146b785b574f42ae9e53d5e` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_fffa7945e50138103659f6326b7` FOREIGN KEY (`statusId`) REFERENCES `status`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_fffa7945e50138103659f6326b7`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_368e146b785b574f42ae9e53d5e`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_c82cd4fa8f0ac4a74328abe997a`");
        await queryRunner.query("DROP INDEX `IDX_648e3f5447f725579d7d4ffdfb` ON `roles`");
        await queryRunner.query("DROP TABLE `roles`");
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP INDEX `IDX_95ff138b88fdd8a7c9ebdb97a3` ON `status`");
        await queryRunner.query("DROP TABLE `status`");
        await queryRunner.query("DROP INDEX `IDX_a205ca5a37fa5e10005f003aaf` ON `stores`");
        await queryRunner.query("DROP TABLE `stores`");
    }

}
