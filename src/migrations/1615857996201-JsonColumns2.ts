import {MigrationInterface, QueryRunner} from "typeorm";

export class JsonColumns21615857996201 implements MigrationInterface {
    name = 'JsonColumns21615857996201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shipping` CHANGE `province` `province` json NULL");
        await queryRunner.query("ALTER TABLE `shipping` CHANGE `location` `location` json NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shipping` CHANGE `location` `location` json NOT NULL");
        await queryRunner.query("ALTER TABLE `shipping` CHANGE `province` `province` json NOT NULL");
    }

}
