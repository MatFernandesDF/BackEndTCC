/*
  Warnings:

  - You are about to drop the column `nivel_acesso` on the `usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "nivel_acesso",
ADD COLUMN     "nivel" INTEGER NOT NULL DEFAULT 1;
