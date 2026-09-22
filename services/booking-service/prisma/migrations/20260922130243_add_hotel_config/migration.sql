-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "cancellation_fee_amount" INTEGER;

-- CreateTable
CREATE TABLE "hotel_config" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "check_in_time" TEXT NOT NULL,
    "check_out_time" TEXT NOT NULL,
    "cancellation_policy" TEXT,
    "tax_rate_bp" INTEGER NOT NULL,
    "amenities" JSONB,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hotel_config_pkey" PRIMARY KEY ("id")
);
