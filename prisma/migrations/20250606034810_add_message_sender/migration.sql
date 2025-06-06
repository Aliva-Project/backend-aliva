/*
  Warnings:

  - Added the required column `sender` to the `VirtualAssistantMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `VirtualAssistantMessage` ADD COLUMN `sender` ENUM('USER', 'ASSISTANT') NOT NULL;
