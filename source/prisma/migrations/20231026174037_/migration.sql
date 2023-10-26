/*
  Warnings:

  - A unique constraint covering the columns `[guildID]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `guildID` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "guildID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tag_guildID_key" ON "Tag"("guildID");
