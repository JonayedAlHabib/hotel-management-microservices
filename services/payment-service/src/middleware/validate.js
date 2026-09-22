import { z } from "zod";
import { ApiError } from "../utils/apiError.js";

function runSchema(schema) {
  return function (req, res, next) {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      throw new ApiError(400, "Validation failed", errors);
    }
    req.body = result.data;
    next();
  };
}

const createPaymentSchema = z.object({
  reservationId: z.string().uuid("reservationId must be a valid reservation id"),
  amount: z.number().positive("amount must be a positive number"),
  currency: z.string().trim().length(3, "currency must be a 3-letter code").optional(),
  gateway: z.enum(["SSLCOMMERZ", "BKASH"]),
});

const initiateCheckoutSchema = z.object({
  gateway: z.enum(["SSLCOMMERZ", "BKASH"]),
});

// UC-G14 invoice — shape-only validation for display text the client
// supplies (room name/dates/nights). Never used for money: the invoice's
// payment lines and total paid always come from this service's own DB.
const invoiceRequestSchema = z.object({
  reference: z.string().trim().optional(),
  roomTypeName: z.string().trim().optional(),
  checkIn: z.string().trim().optional(),
  checkOut: z.string().trim().optional(),
  nights: z.number().int().positive().optional(),
  guestCount: z.number().int().positive().optional(),
});

const validateCreatePayment = runSchema(createPaymentSchema);
const validateInitiateCheckout = runSchema(initiateCheckoutSchema);
const validateInvoiceRequest = runSchema(invoiceRequestSchema);

export { validateCreatePayment, validateInitiateCheckout, validateInvoiceRequest };
