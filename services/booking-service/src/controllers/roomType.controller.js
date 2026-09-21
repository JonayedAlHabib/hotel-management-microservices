import fs from "fs";
import path from "path";
import { prisma } from "../db/prisma.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { todayInHotelTimezone } from "../utils/date.js";
import { UPLOAD_DIR } from "../middleware/upload.js";

const MAX_PHOTOS_PER_ROOM_TYPE = 10; // UC-A05.1

// POST /room-types — ADMIN only
async function createRoomType(req, res) {
  const { name, description, basePrice, maxGuests, bedType, amenities } = req.body;

  const existing = await prisma.roomType.findUnique({ where: { name } });
  if (existing) {
    throw new ApiError(409, "A room type with this name already exists");
  }

  const roomType = await prisma.roomType.create({
    data: { name, description, basePrice, maxGuests, bedType, amenities },
  });

  res.status(201).json(new ApiResponse(201, { roomType }, "Room type created"));
}

// GET /room-types — public, active only ("visible to guests only when active")
async function listRoomTypes(req, res) {
  const roomTypes = await prisma.roomType.findMany({
    where: { isActive: true },
    include: { photos: true },
    orderBy: { basePrice: "asc" },
  });
  res.json(new ApiResponse(200, { roomTypes }, "Fetched room types"));
}

// GET /room-types/:id — public, active only
async function getRoomType(req, res) {
  const roomType = await prisma.roomType.findFirst({
    where: { id: req.params.id, isActive: true },
    include: { photos: true },
  });
  if (!roomType) throw new ApiError(404, "Room type not found");
  res.json(new ApiResponse(200, { roomType }, "Fetched room type"));
}

// PATCH /room-types/:id/deactivate — ADMIN only. UC-A05.2 AC2: blocked while
// future PENDING/CONFIRMED reservations of this type exist; the system lists
// them so the admin knows what to resolve first.
async function deactivateRoomType(req, res) {
  const roomType = await prisma.roomType.findUnique({ where: { id: req.params.id } });
  if (!roomType) throw new ApiError(404, "Room type not found");

  const blocking = await prisma.reservation.findMany({
    where: {
      roomTypeId: roomType.id,
      status: { in: ["PENDING", "CONFIRMED"] },
      checkIn: { gte: todayInHotelTimezone() },
    },
    select: { reference: true, status: true, checkIn: true },
  });

  if (blocking.length > 0) {
    throw new ApiError(
      409,
      "Cannot deactivate a room type with future reservations",
      blocking.map((r) => ({
        field: "reservation",
        message: `${r.reference} (${r.status}, check-in ${r.checkIn.toISOString().slice(0, 10)})`,
      }))
    );
  }

  const updated = await prisma.roomType.update({ where: { id: req.params.id }, data: { isActive: false } });
  res.json(new ApiResponse(200, { roomType: updated }, "Room type deactivated"));
}

// PATCH /room-types/:id/reactivate — ADMIN only
async function reactivateRoomType(req, res) {
  const roomType = await prisma.roomType.findUnique({ where: { id: req.params.id } });
  if (!roomType) throw new ApiError(404, "Room type not found");

  const updated = await prisma.roomType.update({ where: { id: req.params.id }, data: { isActive: true } });
  res.json(new ApiResponse(200, { roomType: updated }, "Room type reactivated"));
}

function cleanupUploadedFiles(files) {
  for (const file of files) {
    fs.unlink(file.path, (err) => {
      if (err) console.error(`Failed to clean up rejected upload ${file.filename}:`, err);
    });
  }
}

// POST /room-types/:id/photos — ADMIN only, multipart/form-data, field name "photos".
// multer's disk storage (upload.js) already wrote req.files to disk as part of
// parsing the request — BEFORE this function ever runs, and before either check
// below. Any rejection past that point means cleaning the files up ourselves,
// or they sit on disk forever, referenced by no database row at all.
async function uploadRoomTypePhotos(req, res) {
  const files = req.files || [];

  const roomType = await prisma.roomType.findUnique({
    where: { id: req.params.id },
    include: { photos: true },
  });
  if (!roomType) {
    cleanupUploadedFiles(files);
    throw new ApiError(404, "Room type not found");
  }

  if (files.length === 0) {
    throw new ApiError(400, "At least one photo file is required (field name: photos)");
  }

  if (roomType.photos.length + files.length > MAX_PHOTOS_PER_ROOM_TYPE) {
    cleanupUploadedFiles(files);
    throw new ApiError(
      409,
      `A room type can have at most ${MAX_PHOTOS_PER_ROOM_TYPE} photos (currently has ${roomType.photos.length})`
    );
  }

  const created = await prisma.$transaction(
    files.map((file) =>
      prisma.roomTypePhoto.create({
        data: {
          roomTypeId: roomType.id,
          filename: file.filename,
          url: `/uploads/room-types/${file.filename}`,
        },
      })
    )
  );

  res.status(201).json(new ApiResponse(201, { photos: created }, "Photos uploaded"));
}

// DELETE /room-types/:id/photos/:photoId — ADMIN only
async function deleteRoomTypePhoto(req, res) {
  const photo = await prisma.roomTypePhoto.findUnique({ where: { id: req.params.photoId } });
  if (!photo || photo.roomTypeId !== req.params.id) {
    throw new ApiError(404, "Photo not found");
  }

  await prisma.roomTypePhoto.delete({ where: { id: photo.id } });

  // DB row is the source of truth and is already gone at this point — a failed
  // file unlink (already missing, permissions, etc.) is logged, not fatal to the request
  fs.unlink(path.join(UPLOAD_DIR, photo.filename), (err) => {
    if (err) console.error(`Failed to delete photo file ${photo.filename}:`, err);
  });

  res.json(new ApiResponse(200, null, "Photo deleted"));
}

export {
  createRoomType,
  listRoomTypes,
  getRoomType,
  deactivateRoomType,
  reactivateRoomType,
  uploadRoomTypePhotos,
  deleteRoomTypePhoto,
};
