import { prisma } from "../db/prisma.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

// GET /hotel-config — public, read-only (UC-G06). Admin editing is UC-A29,
// out of scope here. HotelConfig is a singleton row, seeded once.
async function getHotelConfig(req, res) {
  const config = await prisma.hotelConfig.findFirst();
  if (!config) throw new ApiError(404, "Hotel configuration is not set up");
  res.json(new ApiResponse(200, { hotelConfig: config }, "Fetched hotel configuration"));
}

export { getHotelConfig };
