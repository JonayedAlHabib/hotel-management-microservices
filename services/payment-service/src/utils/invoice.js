import PDFDocument from "pdfkit";

const GATEWAY_LABELS = { SSLCOMMERZ: "SSLCommerz", BKASH: "bKash" };
const TYPE_LABELS = { FULL: "Full Payment", DEPOSIT: "Deposit", BALANCE: "Balance" };

function formatMoney(amount, currency) {
  return `${currency === "BDT" ? "৳" : currency + " "}${Number(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toISOString().slice(0, 10);
}

// Renders straight to the given writable stream (the Express response) —
// caller is responsible for setting headers and piping. `booking` is
// purely descriptive display text the client supplied (room name, dates,
// nights — never trusted for money); `payments` is this service's OWN,
// authoritative rows for the reservation — the only source for amounts.
function renderInvoice(stream, { booking, payments }) {
  const doc = new PDFDocument({ margin: 50 });
  doc.pipe(stream);

  doc.fontSize(20).text("Payment Invoice", { align: "left" });
  doc.moveDown(0.3);
  doc.fontSize(10).fillColor("#666").text(`Generated ${formatDate(new Date())}`);
  doc.fillColor("#000");
  doc.moveDown(1.5);

  doc.fontSize(13).text("Booking");
  doc.moveDown(0.3);
  doc.fontSize(10);
  const bookingRows = [
    ["Reference", booking.reference || "—"],
    ["Room Type", booking.roomTypeName || "—"],
    ["Check-in", formatDate(booking.checkIn)],
    ["Check-out", formatDate(booking.checkOut)],
    ["Nights", booking.nights ?? "—"],
    ["Guests", booking.guestCount ?? "—"],
  ];
  bookingRows.forEach(([label, value]) => {
    doc.text(`${label}: `, { continued: true }).fillColor("#333").text(String(value)).fillColor("#000");
  });

  doc.moveDown(1.5);
  doc.fontSize(13).text("Payments");
  doc.moveDown(0.5);

  const tableTop = doc.y;
  const colX = { type: 50, status: 180, gateway: 280, date: 380, amount: 470 };
  doc.fontSize(9).fillColor("#666");
  doc.text("Type", colX.type, tableTop);
  doc.text("Status", colX.status, tableTop);
  doc.text("Gateway", colX.gateway, tableTop);
  doc.text("Date", colX.date, tableTop);
  doc.text("Amount", colX.amount, tableTop);
  doc.moveTo(50, tableTop + 14).lineTo(545, tableTop + 14).strokeColor("#ccc").stroke();
  doc.fillColor("#000");

  let y = tableTop + 20;
  let totalPaid = 0;
  payments.forEach((p) => {
    doc.fontSize(9);
    doc.text(TYPE_LABELS[p.type] || p.type, colX.type, y);
    doc.text(p.status, colX.status, y);
    doc.text(GATEWAY_LABELS[p.gateway] || p.gateway || "—", colX.gateway, y);
    doc.text(formatDate(p.updatedAt), colX.date, y);
    doc.text(formatMoney(p.amount, p.currency), colX.amount, y);
    if (p.status === "SUCCESS") totalPaid += Number(p.amount);
    y += 18;
  });

  if (payments.length === 0) {
    doc.fontSize(9).fillColor("#666").text("No payments recorded yet.", 50, y);
    y += 18;
  }

  doc.moveTo(50, y + 4).lineTo(545, y + 4).strokeColor("#ccc").stroke();
  doc.fontSize(11).text(`Total Paid: ${formatMoney(totalPaid, payments[0]?.currency || "BDT")}`, 50, y + 14, {
    align: "right",
  });

  doc.end();
}

export { renderInvoice };
