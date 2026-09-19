/*
  Warnings:

  - You are about to drop the `activity_logs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `activity_logs` DROP FOREIGN KEY `activity_logs_userId_fkey`;

-- DropTable
DROP TABLE `activity_logs`;
