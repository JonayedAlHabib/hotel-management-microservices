// One-off/idempotent data load for The Royal Snooze's real room inventory —
// run with `node scripts/seedHotelData.js` from services/booking-service.
// Safe to re-run: upserts by RoomType.name and Room.roomNumber (both unique).
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const COMMON_AMENITIES = {
  wifi: true,
  ac: true,
  tv: true,
  breakfast: true,
  parking: true,
  roomService: true,
};

const ROOM_TYPES = [
  {
    name: "Deluxe Room",
    description:
      "A comfortable and elegantly furnished room designed for couples and business travelers, featuring modern amenities and a relaxing atmosphere.",
    basePrice: 12000,
    maxGuests: 2,
    bedType: "King Bed",
    amenities: { ...COMMON_AMENITIES, minibar: true, pool: true },
    floor: 1,
    rooms: ["101", "102", "103", "104", "105"],
  },
  {
    name: "Superior Room",
    description:
      "A spacious room with upgraded furnishings, modern facilities and a comfortable living space for a relaxing hotel stay.",
    basePrice: 15000,
    maxGuests: 2,
    bedType: "King Bed",
    amenities: { ...COMMON_AMENITIES, minibar: true, pool: true },
    floor: 2,
    rooms: ["201", "202", "203", "204", "205"],
  },
  {
    name: "Twin Room",
    description:
      "A practical and comfortable room featuring two separate single beds, ideal for friends, colleagues and business travelers.",
    basePrice: 14000,
    maxGuests: 2,
    bedType: "2 Single Beds",
    amenities: { ...COMMON_AMENITIES, pool: true },
    floor: 3,
    rooms: ["301", "302", "303", "304", "305"],
  },
  {
    name: "Family Room",
    description:
      "A spacious family-friendly room with multiple sleeping arrangements and enough space for families traveling together.",
    basePrice: 18000,
    maxGuests: 4,
    bedType: "1 King + 2 Single",
    amenities: { ...COMMON_AMENITIES, minibar: true, pool: true },
    floor: 4,
    rooms: ["401", "402", "403", "404", "405"],
  },
  {
    name: "Executive Suite",
    description:
      "A premium suite designed for business executives and guests seeking additional space, privacy and upgraded amenities.",
    basePrice: 25000,
    maxGuests: 3,
    bedType: "King Bed",
    amenities: { ...COMMON_AMENITIES, minibar: true, pool: true, workDesk: true },
    floor: 5,
    rooms: ["501", "502", "503", "504", "505"],
  },
  {
    name: "Honeymoon Suite",
    description:
      "A romantic premium suite designed for couples, featuring elegant interiors, a spacious bedroom and a private relaxing atmosphere.",
    basePrice: 30000,
    maxGuests: 2,
    bedType: "King Bed",
    amenities: { ...COMMON_AMENITIES, minibar: true, pool: true, bathtub: true },
    floor: 6,
    rooms: ["601", "602", "603", "604", "605"],
  },
];

// Matches frontend/src/config/hotel.js and RoomDetailPage.jsx's hardcoded
// cancellation text exactly, since those two files stay static (see
// PROGRESS.md) — this is the live copy HomePage.jsx reads from instead.
const HOTEL_CONFIG = {
  name: "The Royal Snooze",
  description:
    "The Royal Snooze offers comfortable rooms, attentive service, and a convenient central location — everything you need for a relaxed stay, whether you're here for a night or a week.",
  address: "123 Gulshan Avenue, Dhaka, Bangladesh",
  phone: "+880 1700-000000",
  email: "info@royalsnooze.com",
  checkInTime: "14:00",
  checkOutTime: "12:00",
  cancellationPolicy: "Free cancellation any time before check-in.",
  taxRateBp: 500, // 5.00% — BR-03, previously the TAX_RATE_BP constant
};

async function main() {
  const existingConfig = await prisma.hotelConfig.findFirst();
  if (existingConfig) {
    await prisma.hotelConfig.update({ where: { id: existingConfig.id }, data: HOTEL_CONFIG });
    console.log(`Hotel config: updated (${existingConfig.id})`);
  } else {
    const created = await prisma.hotelConfig.create({ data: HOTEL_CONFIG });
    console.log(`Hotel config: created (${created.id})`);
  }

  for (const rt of ROOM_TYPES) {
    const roomType = await prisma.roomType.upsert({
      where: { name: rt.name },
      update: {
        description: rt.description,
        basePrice: rt.basePrice,
        maxGuests: rt.maxGuests,
        bedType: rt.bedType,
        amenities: rt.amenities,
      },
      create: {
        name: rt.name,
        description: rt.description,
        basePrice: rt.basePrice,
        maxGuests: rt.maxGuests,
        bedType: rt.bedType,
        amenities: rt.amenities,
      },
    });
    console.log(`Room type: ${roomType.name} (${roomType.id})`);

    for (const roomNumber of rt.rooms) {
      const room = await prisma.room.upsert({
        where: { roomNumber },
        update: { roomTypeId: roomType.id, floor: rt.floor },
        create: { roomTypeId: roomType.id, roomNumber, floor: rt.floor },
      });
      console.log(`  Room ${room.roomNumber} (floor ${room.floor})`);
    }
  }

  const roomTypeCount = await prisma.roomType.count();
  const roomCount = await prisma.room.count();
  console.log(`\nDone. ${roomTypeCount} room type(s), ${roomCount} room(s) in the database.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
