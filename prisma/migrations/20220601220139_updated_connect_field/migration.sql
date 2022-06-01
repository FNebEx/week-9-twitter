/*
  Warnings:

  - You are about to drop the column `content` on the `Tweet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "content",
ADD COLUMN     "connect" TEXT;
