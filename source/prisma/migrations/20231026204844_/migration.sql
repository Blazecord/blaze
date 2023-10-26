/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagSettings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_tagSettingsGuildId_fkey";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "TagSettings";
