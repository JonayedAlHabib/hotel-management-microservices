-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('FULL', 'DEPOSIT', 'BALANCE');

-- DropIndex
DROP INDEX "Payment_reservationId_key";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "type" "PaymentType" NOT NULL DEFAULT 'FULL';

-- CreateIndex
CREATE INDEX "Payment_reservationId_idx" ON "Payment"("reservationId");
