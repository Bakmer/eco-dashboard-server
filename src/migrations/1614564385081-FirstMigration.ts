import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstMigration1614564385081 implements MigrationInterface {
    name = 'FirstMigration1614564385081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `role` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_ae4578dcaed5adff96595e6166` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `state` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_b2c4aef5929860729007ac32f6` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `last_name` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `store_id` int NOT NULL, `role_id` int NOT NULL, `state_id` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `store` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_66df34da7fb037e24fc7fee642` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `transport` (`id` int NOT NULL AUTO_INCREMENT, `name` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `shipping` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `street` varchar(255) NOT NULL, `street_number` int NOT NULL, `memo` varchar(255) NOT NULL, `cuit` varchar(255) NOT NULL, `province` varchar(255) NOT NULL, `location` varchar(255) NOT NULL, `postal_code` varchar(255) NOT NULL, `client_id` int NOT NULL, `transport_id` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `iva` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `billing` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `last_name` varchar(255) NOT NULL, `street` varchar(255) NOT NULL, `street_number` int NOT NULL, `memo` varchar(255) NOT NULL, `cuit` varchar(255) NOT NULL, `province` varchar(255) NOT NULL, `location` varchar(255) NOT NULL, `postal_code` varchar(255) NOT NULL, `client_id` int NOT NULL, `iva_id` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_2da0f60a121e19f681e0d771cf` (`cuit`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `phone` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `area_code_1` varchar(255) NOT NULL, `phone_1` varchar(255) NOT NULL, `client_id` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `discount` (`id` int NOT NULL AUTO_INCREMENT, `percentage` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `client` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `last_name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `memo` varchar(255) NOT NULL, `store_id` int NOT NULL, `state_id` int NOT NULL, `discount_id` int NOT NULL, `user_id` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `address` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `street` varchar(255) NOT NULL, `street_number` int NOT NULL, `memo` varchar(255) NOT NULL, `province` varchar(255) NOT NULL, `location` varchar(255) NOT NULL, `postal_code` varchar(255) NOT NULL, `client_id` int NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_0b7eefd81e97f9a779785f66080` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_fb2e442d14add3cefbdf33c4561` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user` ADD CONSTRAINT `FK_f5e224bbe5ee7f6dcb2a8e49418` FOREIGN KEY (`state_id`) REFERENCES `state`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `shipping` ADD CONSTRAINT `FK_a74195c79a0525bb6c18cce1dc6` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `shipping` ADD CONSTRAINT `FK_45e29d92663b83aa6077d58e193` FOREIGN KEY (`transport_id`) REFERENCES `transport`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `billing` ADD CONSTRAINT `FK_7d3f1ecbb19afda63bde9370d68` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `billing` ADD CONSTRAINT `FK_6bb909504f8b672f8dd2bc73193` FOREIGN KEY (`iva_id`) REFERENCES `iva`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `phone` ADD CONSTRAINT `FK_5f1565e6dcdd3340bcc1de05ad7` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `client` ADD CONSTRAINT `FK_9a7ba7db5cf3bd2461dc7a8a3cc` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `client` ADD CONSTRAINT `FK_01427faad70b5ed7d42bef57578` FOREIGN KEY (`state_id`) REFERENCES `state`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `client` ADD CONSTRAINT `FK_5c3a55299894f8256415be76998` FOREIGN KEY (`discount_id`) REFERENCES `discount`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `client` ADD CONSTRAINT `FK_f18a6fabea7b2a90ab6bf10a650` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `address` ADD CONSTRAINT `FK_2be82466b35845fdd0d0efcb9f1` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `address` DROP FOREIGN KEY `FK_2be82466b35845fdd0d0efcb9f1`");
        await queryRunner.query("ALTER TABLE `client` DROP FOREIGN KEY `FK_f18a6fabea7b2a90ab6bf10a650`");
        await queryRunner.query("ALTER TABLE `client` DROP FOREIGN KEY `FK_5c3a55299894f8256415be76998`");
        await queryRunner.query("ALTER TABLE `client` DROP FOREIGN KEY `FK_01427faad70b5ed7d42bef57578`");
        await queryRunner.query("ALTER TABLE `client` DROP FOREIGN KEY `FK_9a7ba7db5cf3bd2461dc7a8a3cc`");
        await queryRunner.query("ALTER TABLE `phone` DROP FOREIGN KEY `FK_5f1565e6dcdd3340bcc1de05ad7`");
        await queryRunner.query("ALTER TABLE `billing` DROP FOREIGN KEY `FK_6bb909504f8b672f8dd2bc73193`");
        await queryRunner.query("ALTER TABLE `billing` DROP FOREIGN KEY `FK_7d3f1ecbb19afda63bde9370d68`");
        await queryRunner.query("ALTER TABLE `shipping` DROP FOREIGN KEY `FK_45e29d92663b83aa6077d58e193`");
        await queryRunner.query("ALTER TABLE `shipping` DROP FOREIGN KEY `FK_a74195c79a0525bb6c18cce1dc6`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_f5e224bbe5ee7f6dcb2a8e49418`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_fb2e442d14add3cefbdf33c4561`");
        await queryRunner.query("ALTER TABLE `user` DROP FOREIGN KEY `FK_0b7eefd81e97f9a779785f66080`");
        await queryRunner.query("DROP TABLE `address`");
        await queryRunner.query("DROP TABLE `client`");
        await queryRunner.query("DROP TABLE `discount`");
        await queryRunner.query("DROP TABLE `phone`");
        await queryRunner.query("DROP INDEX `IDX_2da0f60a121e19f681e0d771cf` ON `billing`");
        await queryRunner.query("DROP TABLE `billing`");
        await queryRunner.query("DROP TABLE `iva`");
        await queryRunner.query("DROP TABLE `shipping`");
        await queryRunner.query("DROP TABLE `transport`");
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
