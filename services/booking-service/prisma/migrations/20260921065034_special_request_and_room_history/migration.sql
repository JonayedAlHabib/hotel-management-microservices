-- AlterTable
ALTER TABLE "reservations" ADD COLUMN "special_request" TEXT;

-- CreateTable
CREATE TABLE "room_status_history" (
    "id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "from_status" TEXT,
    "to_status" TEXT NOT NULL,
    "changed_by" TEXT NOT NULL,
    "note" TEXT,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "room_status_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "room_status_history" ADD CONSTRAINT "room_status_history_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
