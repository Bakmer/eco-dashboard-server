"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestMigration1606960783228 = void 0;
class TestMigration1606960783228 {
    constructor() {
        this.name = 'TestMigration1606960783228';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `name` varchar(255) NULL, `last_name` varchar(255) NULL, `password` varchar(255) NOT NULL, `storeId` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
            yield queryRunner.query("CREATE TABLE `stores` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_a205ca5a37fa5e10005f003aaf` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
            yield queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_c82cd4fa8f0ac4a74328abe997a` FOREIGN KEY (`storeId`) REFERENCES `stores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_c82cd4fa8f0ac4a74328abe997a`");
            yield queryRunner.query("DROP INDEX `IDX_a205ca5a37fa5e10005f003aaf` ON `stores`");
            yield queryRunner.query("DROP TABLE `stores`");
            yield queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`");
            yield queryRunner.query("DROP TABLE `users`");
        });
    }
}
exports.TestMigration1606960783228 = TestMigration1606960783228;
//# sourceMappingURL=1606960783228-TestMigration.js.map