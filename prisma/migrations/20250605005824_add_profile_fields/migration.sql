-- AlterTable
ALTER TABLE `user` ADD COLUMN `birthDate` DATETIME(3) NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `ProfileConfig` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fieldName` VARCHAR(191) NOT NULL,
    `displayName` VARCHAR(191) NOT NULL,
    `isRequired` BOOLEAN NOT NULL DEFAULT false,
    `fieldType` ENUM('TEXT', 'EMAIL', 'PHONE', 'DATE', 'NUMBER') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ProfileConfig_fieldName_key`(`fieldName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
