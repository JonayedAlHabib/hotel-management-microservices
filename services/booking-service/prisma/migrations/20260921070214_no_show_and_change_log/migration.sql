-- AlterEnum
ALTER TYPE "ReservationStatus" ADD VALUE 'NO_SHOW';

-- CreateTable
CREATE TABLE "reservation_change_log" (
    "id" TEXT NOT NULL,
    "reservation_id" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "old_value" TEXT,
    "new_value" TEXT,
    "changed_by" TEXT NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reservation_change_log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reservation_change_log" ADD CONSTRAINT "reservation_change_log_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "reservations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
