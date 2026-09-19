export function formatNumberInput(value) {
  if (!value) return "";

  const number = value.toString().replace(/\D/g, "");

  return Number(number).toLocaleString("id-ID");
}

export function unformatNumberInput(value) {
  return value.replace(/\./g, "");
}