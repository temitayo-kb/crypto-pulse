import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./ChartToggle.css";

export default function ChartToggle({ chartType, handleChartType }) {
  return (
    <div className="chart-toggle">
      <ToggleButtonGroup
        value={chartType}
        exclusive
        onChange={handleChartType}
        sx={{
          "&.Mui-selected": {
            color: "var(--blue) !important",
          },
          borderColor: "var(--blue)",
          border: "unset !important",
          "& .MuiToggleButtonGroup-grouped": {
            border: "1px solid var(--blue)!important",
            borderColor: "unset",
            color: "var(--blue) !important ",
          },
          "& .MuiToggleButton-standard": {
            color: "var(--blue) !important",
          },
        }}
      >
        <ToggleButton value="prices" className="toggle-button">
          Price
        </ToggleButton>
        <ToggleButton value="market_caps" className="toggle-button">
          Market Cap
        </ToggleButton>
        <ToggleButton value="total_volumes" className="toggle-button">
          Total Volume
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
