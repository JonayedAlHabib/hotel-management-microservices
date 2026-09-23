-- CreateTable
CREATE TABLE "hotel_config_change_log" (
    "id" TEXT NOT NULL,
    "hotel_config_id" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "old_value" TEXT,
    "new_value" TEXT,
    "changed_by" TEXT NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hotel_config_change_log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "hotel_config_change_log" ADD CONSTRAINT "hotel_config_change_log_hotel_config_id_fkey" FOREIGN KEY ("hotel_config_id") REFERENCES "hotel_config"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
