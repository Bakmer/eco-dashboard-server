import {MigrationInterface, QueryRunner} from "typeorm";

export class TestingNewFeatured1615079732608 implements MigrationInterface {
    name = 'TestingNewFeatured1615079732608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `billing` DROP FOREIGN KEY `FK_6bb909504f8b672f8dd2bc73193`");
        await queryRunner.query("ALTER TABLE `billing` ADD CONSTRAINT `FK_6bb909504f8b672f8dd2bc73193` FOREIGN KEY (`iva_id`) REFERENCES `iva`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `billing` DROP FOREIGN KEY `FK_6bb909504f8b672f8dd2bc73193`");
        await queryRunner.query("ALTER TABLE `billing` ADD CONSTRAINT `FK_6bb909504f8b672f8dd2bc73193` FOREIGN KEY (`iva_id`) REFERENCES `iva`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
