import { useMediaQuery, Theme } from "@mui/material";
import { ScatterChart } from "@mui/x-charts/ScatterChart";

const data = [
  { x: 100, y: 200, id: 1 },
  { x: 120, y: 100, id: 2 },
  { x: 170, y: 300, id: 3 },
  { x: 140, y: 250, id: 4 },
  { x: 150, y: 400, id: 5 },
  { x: 110, y: 280, id: 6 },
];

export default function SimpleScatterChart() {
  const isLargeScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("lg")
  );
  const isMediumScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between("md", "lg")
  );
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  return (
    <ScatterChart
      width={
        isLargeScreen
          ? 500
          : isMediumScreen
          ? 400
          : isSmallScreen
          ? undefined
          : 300
      }
      height={350}
      series={[{ data, label: "pv", id: "pvId" }]}
      xAxis={[{ min: 0 }]}
    />
  );
}
