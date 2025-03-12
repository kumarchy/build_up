/*
  Warnings:

  - You are about to drop the column `like` on the `Like` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('LIKE', 'DISLIKE');

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "like",
ADD COLUMN     "reaction" "ReactionType" NOT NULL DEFAULT 'LIKE';

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "dislike_count" INTEGER NOT NULL DEFAULT 0;
