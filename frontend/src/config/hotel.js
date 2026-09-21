// The hotel's own branding. There's no Hotel settings table/model in the
// backend (deliberately — this system is scoped to one hotel, see
// PROGRESS.md), so this is the one place the name/initial live; update here
// if it ever changes instead of hunting through every page.
const HOTEL_NAME = "The Royal Snooze";
const HOTEL_INITIAL = "R";
const HOTEL_ADDRESS = "123 Gulshan Avenue, Dhaka, Bangladesh";
const HOTEL_PHONE = "+880 1700-000000";
const HOTEL_EMAIL = "info@royalsnooze.com";
const HOTEL_CURRENCY = "BDT";
const HOTEL_CHECK_IN = "14:00";
const HOTEL_CHECK_OUT = "12:00";

export {
  HOTEL_NAME,
  HOTEL_INITIAL,
  HOTEL_ADDRESS,
  HOTEL_PHONE,
  HOTEL_EMAIL,
  HOTEL_CURRENCY,
  HOTEL_CHECK_IN,
  HOTEL_CHECK_OUT,
};
