-- AlterTable
ALTER TABLE "reservations" ADD COLUMN "idempotency_key" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "reservations_idempotency_key_key" ON "reservations"("idempotency_key");
