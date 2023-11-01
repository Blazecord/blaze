/*
  Warnings:

  - You are about to drop the column `enabled` on the `LogSettings` table. All the data in the column will be lost.
  - You are about to drop the column `events` on the `LogSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LogSettings" DROP COLUMN "enabled",
DROP COLUMN "events";

-- DropEnum
DROP TYPE "Events";
