-- AlterTable
ALTER TABLE "pagamentos" ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "produtos" ADD COLUMN     "disponibilidade" BOOLEAN NOT NULL DEFAULT true;
