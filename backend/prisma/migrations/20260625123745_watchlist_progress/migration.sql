/*
  Warnings:

  - A unique constraint covering the columns `[userId,mediaId]` on the table `Watchlist` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "WatchStatus" ADD VALUE 'ON_HOLD';

-- AlterTable
ALTER TABLE "Watchlist" ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "progress" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "startedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Watchlist_userId_mediaId_key" ON "Watchlist"("userId", "mediaId");
