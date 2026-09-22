// Backend stores amounts as integers in minor units (paisa) — BR-12, to avoid
// float rounding errors. This is the one place that gets divided back out for display.
function formatMoney(minorUnits) {
  const amount = minorUnits / 100;
  return `৳${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// payment-service stores Payment.amount as a Decimal already in major units
// (BDT, not poisha) — converted once at the booking.created event boundary
// (see PROGRESS.md). Dividing this by 100 like formatMoney would silently
// show 1/100th of the real amount, so it gets its own formatter instead of
// reusing formatMoney on the wrong unit.
function formatMajorMoney(majorUnits) {
  const amount = Number(majorUnits);
  return `৳${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export { formatMoney, formatMajorMoney };
