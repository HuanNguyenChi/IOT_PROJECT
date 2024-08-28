import { ResponsiveLine } from '@nivo/line';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';

const LineChart = ({ data }) => {
  const theme = useTheme();
  const colorsMode = tokens(theme.palette.mode);
  const customColors = ['#e41a1c', '#377eb8', '#4daf4a'];

  // Function to calculate max value + 10 units
  const getMaxValueWithOffset = (data) => {
    const allValues = data.flatMap((d) => d.data.map((point) => point.y));
    const maxValue = Math.max(...allValues);
    return maxValue + 10;
  };

  const yMax = getMaxValueWithOffset(data);

  return (
    <ResponsiveLine
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colorsMode.grey[100],
            },
          },
          legend: {
            text: {
              fill: colorsMode.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colorsMode.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colorsMode.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colorsMode.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colorsMode.primary[500],
          },
        },
      }}
      colors={customColors}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{
        type: 'point',
        min: 'auto',
        max: 'auto',
      }}
      yScale={{
        type: 'linear',
        min: 0,
        max: yMax,
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Time',
        legendOffset: 36,
        legendPosition: 'middle',
        format: () => '',
      }}
      axisLeft={{
        orient: 'left',
        tickValues: 5,
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Value',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={0}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
