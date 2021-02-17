import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1613525775847 implements MigrationInterface {
    name = 'Test1613525775847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `roles` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_648e3f5447f725579d7d4ffdfb` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `states` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_fe52f02449eaf27be2b2cb7acd` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `name` varchar(255) NULL, `last_name` varchar(255) NULL, `password` varchar(255) NOT NULL, `storeId` int NOT NULL, `roleId` int NOT NULL, `stateId` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `stores` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_a205ca5a37fa5e10005f003aaf` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `clients` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `last_name` varchar(255) NOT NULL, `razon_social` varchar(255) NOT NULL, `cuit` varchar(255) NOT NULL, `iva` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `phone_1` varchar(255) NOT NULL, `phone_2` varchar(255) NULL, `phone_3` varchar(255) NULL, `address_1` varchar(255) NOT NULL, `address_2` varchar(255) NULL, `address_3` varchar(255) NULL, `memo` varchar(255) NOT NULL, `storeId` int NOT NULL, `stateId` int NOT NULL, `userId` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_8c5a7225086f3f422b7b5de03a` (`cuit`), UNIQUE INDEX `IDX_b48860677afe62cd96e1265948` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_c82cd4fa8f0ac4a74328abe997a` FOREIGN KEY (`storeId`) REFERENCES `stores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_368e146b785b574f42ae9e53d5e` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_17bdaad57c3360aae9fb9a1741f` FOREIGN KEY (`stateId`) REFERENCES `states`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `clients` ADD CONSTRAINT `FK_8cbf4f8a5d500f99c15bd327a9e` FOREIGN KEY (`storeId`) REFERENCES `stores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `clients` ADD CONSTRAINT `FK_c1276f66fbe27e9fc3bf9e1d81b` FOREIGN KEY (`stateId`) REFERENCES `states`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `clients` ADD CONSTRAINT `FK_59c1e5e51addd6ebebf76230b37` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `clients` DROP FOREIGN KEY `FK_59c1e5e51addd6ebebf76230b37`");
        await queryRunner.query("ALTER TABLE `clients` DROP FOREIGN KEY `FK_c1276f66fbe27e9fc3bf9e1d81b`");
        await queryRunner.query("ALTER TABLE `clients` DROP FOREIGN KEY `FK_8cbf4f8a5d500f99c15bd327a9e`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_17bdaad57c3360aae9fb9a1741f`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_368e146b785b574f42ae9e53d5e`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_c82cd4fa8f0ac4a74328abe997a`");
        await queryRunner.query("DROP INDEX `IDX_b48860677afe62cd96e1265948` ON `clients`");
        await queryRunner.query("DROP INDEX `IDX_8c5a7225086f3f422b7b5de03a` ON `clients`");
        await queryRunner.query("DROP TABLE `clients`");
        await queryRunner.query("DROP INDEX `IDX_a205ca5a37fa5e10005f003aaf` ON `stores`");
        await queryRunner.query("DROP TABLE `stores`");
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP INDEX `IDX_fe52f02449eaf27be2b2cb7acd` ON `states`");
        await queryRunner.query("DROP TABLE `states`");
        await queryRunner.query("DROP INDEX `IDX_648e3f5447f725579d7d4ffdfb` ON `roles`");
        await queryRunner.query("DROP TABLE `roles`");
    }

}
