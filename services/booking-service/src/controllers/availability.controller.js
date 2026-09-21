import { prisma } from "../db/prisma.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { checkAvailability } from "../services/availability.service.js";
import { MAX_STAY_NIGHTS, MIN_STAY_NIGHTS } from "../config/constants.js";
import { todayInHotelTimezone, parseDateParam } from "../utils/date.js";

// GET /availability?checkIn=&checkOut=&guestCount=&roomTypeId=(optional)
// &minPrice=&maxPrice=&bedType=&amenities=wifi,pool&sortDir=asc|desc
//
// With roomTypeId: availability for that one type (filters below don't apply —
// the caller already knows which type they want). Without it: every active
// room type that fits guestCount, matches the optional filters, AND clears
// BR-01 for the whole range — the guest-facing search list (UC-G08.2).
async function getAvailability(req, res) {
  const {
    checkIn: checkInRaw,
    checkOut: checkOutRaw,
    guestCount: guestCountRaw,
    roomTypeId,
    minPrice: minPriceRaw,
    maxPrice: maxPriceRaw,
    bedType,
    amenities: amenitiesRaw,
    sortDir,
  } = req.query;

  const checkIn = parseDateParam(checkInRaw, "checkIn");
  const checkOut = parseDateParam(checkOutRaw, "checkOut");
  if (checkIn < todayInHotelTimezone()) throw new ApiError(400, "checkIn cannot be in the past");
  if (checkOut <= checkIn) throw new ApiError(400, "checkOut must be after checkIn");

  const nights = Math.round((checkOut - checkIn) / 86400000);
  if (nights < MIN_STAY_NIGHTS || nights > MAX_STAY_NIGHTS) {
    throw new ApiError(400, `Stay must be between ${MIN_STAY_NIGHTS} and ${MAX_STAY_NIGHTS} nights`);
  }

  const guestCount = guestCountRaw ? Number(guestCountRaw) : undefined;
  if (guestCountRaw && (!Number.isInteger(guestCount) || guestCount < 1)) {
    throw new ApiError(400, "guestCount must be a positive integer");
  }

  if (roomTypeId) {
    const roomType = await prisma.roomType.findFirst({ where: { id: roomTypeId, isActive: true } });
    if (!roomType) throw new ApiError(404, "Room type not found");

    const result = await checkAvailability(prisma, { roomTypeId, checkIn, checkOut });
    return res.json(
      new ApiResponse(200, { roomType, nights, ...result, fitsGuestCount: !guestCount || guestCount <= roomType.maxGuests }, "Fetched availability")
    );
  }

  const minPrice = minPriceRaw ? Number(minPriceRaw) : undefined;
  const maxPrice = maxPriceRaw ? Number(maxPriceRaw) : undefined;
  if (minPriceRaw && (!Number.isFinite(minPrice) || minPrice < 0)) {
    throw new ApiError(400, "minPrice must be a non-negative number");
  }
  if (maxPriceRaw && (!Number.isFinite(maxPrice) || maxPrice < 0)) {
    throw new ApiError(400, "maxPrice must be a non-negative number");
  }

  // Amenities is a free-form JSON object per room type (e.g. {wifi:true, pool:true}) —
  // UC-G08.2 wants a multi-amenity filter where ALL requested ones must match, so
  // each requested amenity becomes its own AND'd JSON-path condition rather than
  // one query trying to match the whole object shape.
  const amenityList = amenitiesRaw ? amenitiesRaw.split(",").map((a) => a.trim()).filter(Boolean) : [];

  const roomTypes = await prisma.roomType.findMany({
    where: {
      isActive: true,
      ...(guestCount ? { maxGuests: { gte: guestCount } } : {}),
      ...(minPrice !== undefined ? { basePrice: { gte: minPrice } } : {}),
      ...(maxPrice !== undefined ? { basePrice: { lte: maxPrice } } : {}),
      ...(bedType ? { bedType } : {}),
      ...(amenityList.length > 0
        ? { AND: amenityList.map((name) => ({ amenities: { path: [name], equals: true } })) }
        : {}),
    },
    orderBy: { basePrice: sortDir === "desc" ? "desc" : "asc" },
  });

  const results = await Promise.all(
    roomTypes.map(async (roomType) => {
      const result = await checkAvailability(prisma, { roomTypeId: roomType.id, checkIn, checkOut });
      return { roomType, nights, ...result };
    })
  );

  res.json(new ApiResponse(200, { results: results.filter((r) => r.available) }, "Fetched availability"));
}

export { getAvailability };
