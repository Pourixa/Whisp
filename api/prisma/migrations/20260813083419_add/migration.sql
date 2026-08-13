/*
  Warnings:

  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "lastOnline" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "isOnline" SET DEFAULT true,
ALTER COLUMN "avatar" SET DEFAULT '',
ALTER COLUMN "about" SET DEFAULT '';
