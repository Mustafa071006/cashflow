export default function formatChartCurrency(
  value,
  language = "id"
) {
  if (value >= 1000000) {
    const result =
      (value / 1000000).toFixed(1);

    return language === "id"
      ? `Rp ${result} Jt`
      : `Rp ${result}M`;
  }


  if (value >= 1000) {
    const result =
      (value / 1000).toFixed(0);

    return language === "id"
      ? `Rp ${result} Rb`
      : `Rp ${result}K`;
  }


  return `Rp ${value}`;
}