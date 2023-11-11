/*
  Warnings:

  - Added the required column `usuario_id` to the `ordens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ordens" ADD COLUMN     "nome" TEXT,
ADD COLUMN     "usuario_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ordens" ADD CONSTRAINT "ordens_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
