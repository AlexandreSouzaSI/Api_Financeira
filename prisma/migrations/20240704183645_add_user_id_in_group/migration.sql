/*
  Warnings:

  - Added the required column `user_id` to the `group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "group" ADD COLUMN     "user_id" TEXT NOT NULL;
