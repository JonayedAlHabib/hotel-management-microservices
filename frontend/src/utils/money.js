// Backend stores amounts as integers in minor units (paisa) — BR-12, to avoid
// float rounding errors. This is the one place that gets divided back out for display.
function formatMoney(minorUnits) {
  const amount = minorUnits / 100;
  return `৳${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export { formatMoney };
