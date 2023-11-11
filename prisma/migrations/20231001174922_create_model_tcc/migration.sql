/*
  Warnings:

  - A unique constraint covering the columns `[ordemId]` on the table `pagamentos` will be added. If there are existing duplicate values, this will fail.
  - Made the column `ordemId` on table `pagamentos` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "pagamentos" DROP CONSTRAINT "pagamentos_ordemId_fkey";

-- AlterTable
ALTER TABLE "pagamentos" ALTER COLUMN "ordemId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "pagamentos_ordemId_key" ON "pagamentos"("ordemId");

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_ordemId_fkey" FOREIGN KEY ("ordemId") REFERENCES "ordens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
