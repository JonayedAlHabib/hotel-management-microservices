import { prisma } from "../db/prisma.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

// GET /hotel-config — public, read-only (UC-G06). HotelConfig is a
// singleton row, seeded once (scripts/seedHotelData.js).
async function getHotelConfig(req, res) {
  const config = await prisma.hotelConfig.findFirst();
  if (!config) throw new ApiError(404, "Hotel configuration is not set up");
  res.json(new ApiResponse(200, { hotelConfig: config }, "Fetched hotel configuration"));
}

// PATCH /hotel-config — admin-only (UC-A29). Content fields only
// (name..cancellationPolicy); taxRateBp/amenities are a pricing-policy
// change and are not editable through this endpoint. Updates the existing
// singleton row (never creates a second one) and logs every changed field
// (BR-11), matching ReservationChangeLog's shape.
const EDITABLE_FIELDS = ["name", "description", "address", "phone", "email", "checkInTime", "checkOutTime", "cancellationPolicy"];

async function updateHotelConfig(req, res) {
  const config = await prisma.hotelConfig.findFirst();
  if (!config) throw new ApiError(404, "Hotel configuration is not set up");

  const changes = [];
  const data = {};
  for (const field of EDITABLE_FIELDS) {
    if (req.body[field] === undefined) continue;
    const newValue = req.body[field];
    const oldValue = config[field];
    if (newValue === oldValue) continue;
    data[field] = newValue;
    changes.push({
      hotelConfigId: config.id,
      field,
      oldValue: oldValue ?? null,
      newValue: newValue ?? null,
      changedBy: req.user.id,
    });
  }

  if (changes.length === 0) {
    return res.json(new ApiResponse(200, { hotelConfig: config }, "No changes"));
  }

  const updated = await prisma.$transaction(async (tx) => {
    const result = await tx.hotelConfig.update({ where: { id: config.id }, data });
    await tx.hotelConfigChangeLog.createMany({ data: changes });
    return result;
  });

  res.json(new ApiResponse(200, { hotelConfig: updated }, "Hotel configuration updated"));
}

export { getHotelConfig, updateHotelConfig };
