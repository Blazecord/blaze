-- CreateEnum
CREATE TYPE "Events" AS ENUM ('GUILD_CHANNEL_CREATE', 'GUILD_CHANNEL_DELETE', 'GUILD_ROLE_CREATE', 'GUILD_ROLE_DELETE', 'GUILD_MEMBER_ADD', 'GUILD_MEMBER_REMOVE', 'GUILD_MEMBER_BAN_ADD', 'GUILD_MEMBER_BAN_REMOVE', 'MESSAGE_DELETE', 'MESSAGE_EDIT');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('EN', 'DE');

-- CreateEnum
CREATE TYPE "Alt_dectection_age" AS ENUM ('NONE', 'ONE_DAY', 'ONE_WEEK', 'ONE_MONTH');

-- CreateTable
CREATE TABLE "GuildSettings" (
    "guildId" TEXT NOT NULL,
    "language" "Language" NOT NULL
);

-- CreateTable
CREATE TABLE "ModerationData" (
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AutoRoleSettings" (
    "guildId" TEXT NOT NULL,
    "roles" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "AltDetectorSettings" (
    "guildId" TEXT NOT NULL,
    "age" "Alt_dectection_age" NOT NULL,
    "nlp" BOOLEAN DEFAULT false
);

-- CreateTable
CREATE TABLE "TagSettings" (
    "guildId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tag" (
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "tagSettingsGuildId" TEXT
);

-- CreateTable
CREATE TABLE "LogSettings" (
    "guildId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "events" "Events"[]
);

-- CreateTable
CREATE TABLE "Timeout" (
    "userId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "moderationDataUserId" TEXT
);

-- CreateTable
CREATE TABLE "Warn" (
    "userId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "moderator" TEXT NOT NULL DEFAULT 'Unknown',
    "moderationDataUserId" TEXT
);

-- CreateTable
CREATE TABLE "Report" (
    "userId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "moderationDataUserId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "GuildSettings_guildId_key" ON "GuildSettings"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "ModerationData_userId_key" ON "ModerationData"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AutoRoleSettings_guildId_key" ON "AutoRoleSettings"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "AutoRoleSettings_roles_key" ON "AutoRoleSettings"("roles");

-- CreateIndex
CREATE UNIQUE INDEX "AltDetectorSettings_guildId_key" ON "AltDetectorSettings"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "TagSettings_guildId_key" ON "TagSettings"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "LogSettings_guildId_key" ON "LogSettings"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "Timeout_userId_key" ON "Timeout"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Warn_userId_key" ON "Warn"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Report_userId_key" ON "Report"("userId");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_tagSettingsGuildId_fkey" FOREIGN KEY ("tagSettingsGuildId") REFERENCES "TagSettings"("guildId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timeout" ADD CONSTRAINT "Timeout_moderationDataUserId_fkey" FOREIGN KEY ("moderationDataUserId") REFERENCES "ModerationData"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Warn" ADD CONSTRAINT "Warn_moderationDataUserId_fkey" FOREIGN KEY ("moderationDataUserId") REFERENCES "ModerationData"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_moderationDataUserId_fkey" FOREIGN KEY ("moderationDataUserId") REFERENCES "ModerationData"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
