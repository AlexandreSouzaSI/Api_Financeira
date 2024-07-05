/*
  Warnings:

  - You are about to drop the `orcamentos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `redas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "orcamentos" DROP CONSTRAINT "orcamentos_user_id_fkey";

-- DropForeignKey
ALTER TABLE "redas" DROP CONSTRAINT "redas_user_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "groupId" TEXT;

-- DropTable
DROP TABLE "orcamentos";

-- DropTable
DROP TABLE "redas";

-- CreateTable
CREATE TABLE "groups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "despesas" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "data" TIMESTAMP(3),
    "valor" DECIMAL(65,30) NOT NULL,
    "dataVencimento" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "despesas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rendas" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "data" TIMESTAMP(3),
    "valor" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "rendas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rendas" ADD CONSTRAINT "rendas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
