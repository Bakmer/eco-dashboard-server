import {MigrationInterface, QueryRunner} from "typeorm";

export class TestingNewFeature1615078909518 implements MigrationInterface {
    name = 'TestingNewFeature1615078909518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shipping` DROP FOREIGN KEY `FK_a74195c79a0525bb6c18cce1dc6`");
        await queryRunner.query("ALTER TABLE `billing` DROP FOREIGN KEY `FK_7d3f1ecbb19afda63bde9370d68`");
        await queryRunner.query("ALTER TABLE `phone` DROP FOREIGN KEY `FK_5f1565e6dcdd3340bcc1de05ad7`");
        await queryRunner.query("ALTER TABLE `address` DROP FOREIGN KEY `FK_2be82466b35845fdd0d0efcb9f1`");
        await queryRunner.query("ALTER TABLE `shipping` ADD `deleted_at` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `billing` ADD `deleted_at` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `phone` ADD `deleted_at` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `client` ADD `deleted_at` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `address` ADD `deleted_at` datetime(6) NULL");
        await queryRunner.query("ALTER TABLE `shipping` ADD CONSTRAINT `FK_a74195c79a0525bb6c18cce1dc6` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `billing` ADD CONSTRAINT `FK_7d3f1ecbb19afda63bde9370d68` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `phone` ADD CONSTRAINT `FK_5f1565e6dcdd3340bcc1de05ad7` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `address` ADD CONSTRAINT `FK_2be82466b35845fdd0d0efcb9f1` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `address` DROP FOREIGN KEY `FK_2be82466b35845fdd0d0efcb9f1`");
        await queryRunner.query("ALTER TABLE `phone` DROP FOREIGN KEY `FK_5f1565e6dcdd3340bcc1de05ad7`");
        await queryRunner.query("ALTER TABLE `billing` DROP FOREIGN KEY `FK_7d3f1ecbb19afda63bde9370d68`");
        await queryRunner.query("ALTER TABLE `shipping` DROP FOREIGN KEY `FK_a74195c79a0525bb6c18cce1dc6`");
        await queryRunner.query("ALTER TABLE `address` DROP COLUMN `deleted_at`");
        await queryRunner.query("ALTER TABLE `client` DROP COLUMN `deleted_at`");
        await queryRunner.query("ALTER TABLE `phone` DROP COLUMN `deleted_at`");
        await queryRunner.query("ALTER TABLE `billing` DROP COLUMN `deleted_at`");
        await queryRunner.query("ALTER TABLE `shipping` DROP COLUMN `deleted_at`");
        await queryRunner.query("ALTER TABLE `address` ADD CONSTRAINT `FK_2be82466b35845fdd0d0efcb9f1` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `phone` ADD CONSTRAINT `FK_5f1565e6dcdd3340bcc1de05ad7` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `billing` ADD CONSTRAINT `FK_7d3f1ecbb19afda63bde9370d68` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `shipping` ADD CONSTRAINT `FK_a74195c79a0525bb6c18cce1dc6` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
