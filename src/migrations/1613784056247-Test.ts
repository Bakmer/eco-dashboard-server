import {MigrationInterface, QueryRunner} from "typeorm";

export class Test1613784056247 implements MigrationInterface {
    name = 'Test1613784056247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `role` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_ae4578dcaed5adff96595e6166` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `state` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_b2c4aef5929860729007ac32f6` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `name` varchar(255) NULL, `last_name` varchar(255) NULL, `password` varchar(255) NOT NULL, `storeId` int NOT NULL, `roleId` int NOT NULL, `state_id` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `store` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_66df34da7fb037e24fc7fee642` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `shipping_method` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `client_address` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `last_name` varchar(255) NOT NULL, `street` varchar(255) NOT NULL, `street_number` int NOT NULL, `cuit` varchar(255) NOT NULL, `province` varchar(255) NOT NULL, `location` varchar(255) NOT NULL, `postal_code` varchar(255) NOT NULL, `area_code_1` varchar(255) NOT NULL, `phone_1` varchar(255) NOT NULL, `area_code_2` varchar(255) NULL, `phone_2` varchar(255) NULL, `clientId` int NOT NULL, `shippingMethodId` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `client` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `last_name` varchar(255) NOT NULL, `razon_social` varchar(255) NOT NULL, `cuit` varchar(255) NOT NULL, `iva` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `area_code_1` varchar(255) NOT NULL, `phone_1` varchar(255) NOT NULL, `area_code_2` varchar(255) NULL, `phone_2` varchar(255) NULL, `area_code_3` varchar(255) NULL, `phone_3` varchar(255) NULL, `memo` varchar(255) NOT NULL, `storeId` int NOT NULL, `userId` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `state_id` int NULL, UNIQUE INDEX `IDX_0de4cee9350c5bf2815dabc08c` (`cuit`), UNIQUE INDEX `IDX_6436cc6b79593760b9ef921ef1` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_e1352f3eacfce12c2b7bcc5b9f8` FOREIGN KEY (`storeId`) REFERENCES `store`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_c28e52f758e7bbc53828db92194` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_f5e224bbe5ee7f6dcb2a8e49418` FOREIGN KEY (`state_id`) REFERENCES `state`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `client_address` ADD CONSTRAINT `FK_f7713b7642f8ad9a8549326c6d0` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `client_address` ADD CONSTRAINT `FK_e85463cf891b44331edb83d2c39` FOREIGN KEY (`shippingMethodId`) REFERENCES `shipping_method`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `client` ADD CONSTRAINT `FK_081c6850decf91403b34f3eb8ea` FOREIGN KEY (`storeId`) REFERENCES `store`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `client` ADD CONSTRAINT `FK_01427faad70b5ed7d42bef57578` FOREIGN KEY (`state_id`) REFERENCES `state`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `client` ADD CONSTRAINT `FK_ad3b4bf8dd18a1d467c5c0fc13a` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `client` DROP FOREIGN KEY `FK_ad3b4bf8dd18a1d467c5c0fc13a`");
        await queryRunner.query("ALTER TABLE `client` DROP FOREIGN KEY `FK_01427faad70b5ed7d42bef57578`");
        await queryRunner.query("ALTER TABLE `client` DROP FOREIGN KEY `FK_081c6850decf91403b34f3eb8ea`");
        await queryRunner.query("ALTER TABLE `client_address` DROP FOREIGN KEY `FK_e85463cf891b44331edb83d2c39`");
        await queryRunner.query("ALTER TABLE `client_address` DROP FOREIGN KEY `FK_f7713b7642f8ad9a8549326c6d0`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_f5e224bbe5ee7f6dcb2a8e49418`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_c28e52f758e7bbc53828db92194`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_e1352f3eacfce12c2b7bcc5b9f8`");
        await queryRunner.query("DROP INDEX `IDX_6436cc6b79593760b9ef921ef1` ON `client`");
        await queryRunner.query("DROP INDEX `IDX_0de4cee9350c5bf2815dabc08c` ON `client`");
        await queryRunner.query("DROP TABLE `client`");
        await queryRunner.query("DROP TABLE `client_address`");
        await queryRunner.query("DROP TABLE `shipping_method`");
        await queryRunner.query("DROP INDEX `IDX_66df34da7fb037e24fc7fee642` ON `store`");
        await queryRunner.query("DROP TABLE `store`");
        await queryRunner.query("DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP INDEX `IDX_b2c4aef5929860729007ac32f6` ON `state`");
        await queryRunner.query("DROP TABLE `state`");
        await queryRunner.query("DROP INDEX `IDX_ae4578dcaed5adff96595e6166` ON `role`");
        await queryRunner.query("DROP TABLE `role`");
    }

}
