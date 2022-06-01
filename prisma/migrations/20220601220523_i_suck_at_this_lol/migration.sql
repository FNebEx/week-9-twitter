/*
  Warnings:

  - You are about to drop the column `connect` on the `Tweet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "connect",
ADD COLUMN     "content" TEXT;
