/*
  Warnings:

  - Made the column `emailConfirmed` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "emailConfirmed" SET NOT NULL,
ALTER COLUMN "emailConfirmed" SET DEFAULT false;
