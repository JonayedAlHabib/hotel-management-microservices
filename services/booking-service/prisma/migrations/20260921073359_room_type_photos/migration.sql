-- CreateTable
CREATE TABLE "room_type_photos" (
    "id" TEXT NOT NULL,
    "room_type_id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "room_type_photos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "room_type_photos" ADD CONSTRAINT "room_type_photos_room_type_id_fkey" FOREIGN KEY ("room_type_id") REFERENCES "room_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
