/*
  Warnings:

  - A unique constraint covering the columns `[externalId,source]` on the table `Media` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalId` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Media_title_key";

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "externalId" TEXT NOT NULL,
ADD COLUMN     "source" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Media_externalId_source_key" ON "Media"("externalId", "source");
