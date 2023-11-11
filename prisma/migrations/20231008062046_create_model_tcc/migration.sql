/*
  Warnings:

  - You are about to drop the `pagamentos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "pagamentos" DROP CONSTRAINT "pagamentos_ordemId_fkey";

-- AlterTable
ALTER TABLE "ordens" ADD COLUMN     "priceId" TEXT;

-- DropTable
DROP TABLE "pagamentos";
