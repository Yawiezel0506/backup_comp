import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { Theme, styled } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const data = [
  { value: 5, label: "A" },
  { value: 10, label: "B" },
  { value: 15, label: "C" },
  { value: 20, label: "D" },
];

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function PieChartWithCenterLabel() {
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
    <PieChart
      series={[{ data, innerRadius: 80 }]}
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
    >
      <PieCenterLabel>Center label</PieCenterLabel>
    </PieChart>
  );
}
