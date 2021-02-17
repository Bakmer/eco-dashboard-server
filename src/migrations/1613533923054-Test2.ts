import {MigrationInterface, QueryRunner} from "typeorm";

export class Test21613533923054 implements MigrationInterface {
    name = 'Test21613533923054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_17bdaad57c3360aae9fb9a1741f`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_368e146b785b574f42ae9e53d5e`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_c82cd4fa8f0ac4a74328abe997a`");
        await queryRunner.query("ALTER TABLE `client` DROP FOREIGN KEY `FK_59c1e5e51addd6ebebf76230b37`");
        await queryRunner.query("ALTER TABLE `client` DROP FOREIGN KEY `FK_8cbf4f8a5d500f99c15bd327a9e`");
        await queryRunner.query("ALTER TABLE `client` DROP FOREIGN KEY `FK_c1276f66fbe27e9fc3bf9e1d81b`");
        await queryRunner.query("DROP INDEX `IDX_648e3f5447f725579d7d4ffdfb` ON `role`");
        await queryRunner.query("DROP INDEX `IDX_fe52f02449eaf27be2b2cb7acd` ON `state`");
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_a205ca5a37fa5e10005f003aaf` ON `store`");
        await queryRunner.query("DROP INDEX `IDX_8c5a7225086f3f422b7b5de03a` ON `client`");
        await queryRunner.query("DROP INDEX `IDX_b48860677afe62cd96e1265948` ON `client`");
        await queryRunner.query("CREATE TABLE `shipping_method` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `client_address` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `last_name` varchar(255) NOT NULL, `street` varchar(255) NOT NULL, `street_number` int NOT NULL, `cuit` varchar(255) NOT NULL, `province` varchar(255) NOT NULL, `location` varchar(255) NOT NULL, `postal_code` varchar(255) NOT NULL, `area_code_1` varchar(255) NOT NULL, `phone_1` varchar(255) NOT NULL, `area_code_2` varchar(255) NULL, `phone_2` varchar(255) NULL, `clientId` int NOT NULL, `shippingMethodId` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `address_3`");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `address_2`");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `address_1`");
        await queryRunner.query("ALTER TABLE `client` ADD `area_code_1` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `client` ADD `area_code_2` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `client` ADD `area_code_3` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `role` CHANGE `name` `name` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `role` ADD UNIQUE INDEX `IDX_ae4578dcaed5adff96595e6166` (`name`)");
        await queryRunner.query("ALTER TABLE `state` CHANGE `name` `name` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `state` ADD UNIQUE INDEX `IDX_b2c4aef5929860729007ac32f6` (`name`)");
        await queryRunner.query("ALTER TABLE `user` CHANGE `username` `username` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`)");
        await queryRunner.query("ALTER TABLE `store` CHANGE `name` `name` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `store` ADD UNIQUE INDEX `IDX_66df34da7fb037e24fc7fee642` (`name`)");
        await queryRunner.query("ALTER TABLE `client` CHANGE `cuit` `cuit` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `client` ADD UNIQUE INDEX `IDX_0de4cee9350c5bf2815dabc08c` (`cuit`)");
        await queryRunner.query("ALTER TABLE `client` CHANGE `email` `email` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `client` ADD UNIQUE INDEX `IDX_6436cc6b79593760b9ef921ef1` (`email`)");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_e1352f3eacfce12c2b7bcc5b9f8` FOREIGN KEY (`storeId`) REFERENCES `store`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_c28e52f758e7bbc53828db92194` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_f60908abb44a4d712a4e6956eee` FOREIGN KEY (`stateId`) REFERENCES `state`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `client_address` ADD CONSTRAINT `FK_f7713b7642f8ad9a8549326c6d0` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `client_address` ADD CONSTRAINT `FK_e85463cf891b44331edb83d2c39` FOREIGN KEY (`shippingMethodId`) REFERENCES `shipping_method`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `client` ADD CONSTRAINT `FK_081c6850decf91403b34f3eb8ea` FOREIGN KEY (`storeId`) REFERENCES `store`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `client` ADD CONSTRAINT `FK_1727e486647cc251dde2ad76386` FOREIGN KEY (`stateId`) REFERENCES `state`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `client` ADD CONSTRAINT `FK_ad3b4bf8dd18a1d467c5c0fc13a` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `client` DROP FOREIGN KEY `FK_ad3b4bf8dd18a1d467c5c0fc13a`");
        await queryRunner.query("ALTER TABLE `client` DROP FOREIGN KEY `FK_1727e486647cc251dde2ad76386`");
        await queryRunner.query("ALTER TABLE `client` DROP FOREIGN KEY `FK_081c6850decf91403b34f3eb8ea`");
        await queryRunner.query("ALTER TABLE `client_address` DROP FOREIGN KEY `FK_e85463cf891b44331edb83d2c39`");
        await queryRunner.query("ALTER TABLE `client_address` DROP FOREIGN KEY `FK_f7713b7642f8ad9a8549326c6d0`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_f60908abb44a4d712a4e6956eee`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_c28e52f758e7bbc53828db92194`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_e1352f3eacfce12c2b7bcc5b9f8`");
        await queryRunner.query("ALTER TABLE `client` DROP INDEX `IDX_6436cc6b79593760b9ef921ef1`");
        await queryRunner.query("ALTER TABLE `client` CHANGE `email` `email` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `client` DROP INDEX `IDX_0de4cee9350c5bf2815dabc08c`");
        await queryRunner.query("ALTER TABLE `client` CHANGE `cuit` `cuit` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `store` DROP INDEX `IDX_66df34da7fb037e24fc7fee642`");
        await queryRunner.query("ALTER TABLE `store` CHANGE `name` `name` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed`");
        await queryRunner.query("ALTER TABLE `user` CHANGE `username` `username` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `state` DROP INDEX `IDX_b2c4aef5929860729007ac32f6`");
        await queryRunner.query("ALTER TABLE `state` CHANGE `name` `name` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `role` DROP INDEX `IDX_ae4578dcaed5adff96595e6166`");
        await queryRunner.query("ALTER TABLE `role` CHANGE `name` `name` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `area_code_3`");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `area_code_2`");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `area_code_1`");
        await queryRunner.query("ALTER TABLE `client` ADD `address_1` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `client` ADD `address_2` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `client` ADD `address_3` varchar(255) NULL");
        await queryRunner.query("DROP TABLE `client_address`");
        await queryRunner.query("DROP TABLE `shipping_method`");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_b48860677afe62cd96e1265948` ON `client` (`email`)");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_8c5a7225086f3f422b7b5de03a` ON `client` (`cuit`)");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_a205ca5a37fa5e10005f003aaf` ON `store` (`name`)");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `user` (`username`)");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_fe52f02449eaf27be2b2cb7acd` ON `state` (`name`)");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_648e3f5447f725579d7d4ffdfb` ON `role` (`name`)");
        await queryRunner.query("ALTER TABLE `client` ADD CONSTRAINT `FK_c1276f66fbe27e9fc3bf9e1d81b` FOREIGN KEY (`stateId`) REFERENCES `state`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `client` ADD CONSTRAINT `FK_8cbf4f8a5d500f99c15bd327a9e` FOREIGN KEY (`storeId`) REFERENCES `store`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `client` ADD CONSTRAINT `FK_59c1e5e51addd6ebebf76230b37` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_c82cd4fa8f0ac4a74328abe997a` FOREIGN KEY (`storeId`) REFERENCES `store`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_368e146b785b574f42ae9e53d5e` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_17bdaad57c3360aae9fb9a1741f` FOREIGN KEY (`stateId`) REFERENCES `state`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
