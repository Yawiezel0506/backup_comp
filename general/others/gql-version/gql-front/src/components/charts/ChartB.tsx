import { Theme, useMediaQuery } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

export default function SimpleLineChart() {

  const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const isMediumScreen = useMediaQuery((theme: Theme) => theme.breakpoints.between("md", "lg"));
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  return (
    <LineChart
    width={
      isLargeScreen ? 500 : (isMediumScreen ? 400 : (isSmallScreen ? undefined : 300))
    }
    height={350}
      series={[
        { data: pData, label: 'pv' },
        { data: uData, label: 'uv' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
    />
  );
}
