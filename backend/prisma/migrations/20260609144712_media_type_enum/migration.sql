/*
  Warnings:

  - Changed the type of `mediaType` on the `Media` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('ANIME', 'MOVIE', 'TV', 'GAME');

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "mediaType",
ADD COLUMN     "mediaType" "MediaType" NOT NULL;
