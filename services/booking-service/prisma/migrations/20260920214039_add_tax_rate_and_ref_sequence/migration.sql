/*
  Warnings:

  - Added the required column `tax_rate_bp` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "tax_rate_bp" INTEGER NOT NULL;

-- Human-readable booking reference (BK1023-style). A real Postgres sequence,
-- not a COUNT(*)+1 in app code, so two concurrent inserts can never collide
-- on the same reference number. Gaps on a rolled-back transaction are fine —
-- sequences deliberately aren't transactional, only uniqueness matters (BR-04/11).
CREATE SEQUENCE IF NOT EXISTS reservation_reference_seq START 1000;
