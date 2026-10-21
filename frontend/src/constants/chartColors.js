export const CHART_COLORS = {
  income: "#30d158",
  expense: "#ff453a",
  balance: "#2997ff",
};

// Apple system colors (dark variants) — used only inside charts
export const PIE_COLORS = [
  "#0a84ff",
  "#30d158",
  "#ff9f0a",
  "#bf5af2",
  "#64d2ff",
  "#ff375f",
  "#ffd60a",
  "#5e5ce6",
];

export const CHART_UI = {
  grid: "#333336",
  axis: "#86868b",
  cursor: "rgba(255, 255, 255, 0.04)",
};

// Shared props for Recharts' default <Tooltip />
export const CHART_TOOLTIP = {
  contentStyle: {
    backgroundColor: "rgba(14, 14, 14, 0.95)",
    border: "1px solid #282828",
    borderRadius: "20px",
    color: "#f5f5f7",
    fontSize: "14px",
    padding: "10px 14px",
  },
  labelStyle: { color: "#86868b", fontSize: "12px", marginBottom: "4px" },
  itemStyle: { color: "#f5f5f7" },
  cursor: { fill: "rgba(255, 255, 255, 0.04)" },
};
