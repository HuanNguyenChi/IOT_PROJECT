import { Box, IconButton, Typography, useTheme, Button } from '@mui/material';
import { tokens } from '../../theme';
import { useState, useEffect } from 'react';
import { device } from '../../data/mockData';
import axios from 'axios';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import LightModeIcon from '@mui/icons-material/LightMode';

import Header from '../../components/Header';
import StatBox from '../../components/StatBox';
import LineChart from '../../components/LineChart';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [dataSensors, setDataSensors] = useState([]); // State to store API data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8086/api/'); // Adjust the URL if needed
        setDataSensors(response.data);
        console.log(response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const chartData = [
    {
      id: 'temperature',
      // color: 'hsl(207, 70%, 50%)',
      data: dataSensors.map((sensor) => ({
        x: sensor.time,
        y: sensor.temperature,
      })),
    },
    {
      id: 'humidity',
      // color: 'hsl(120, 70%, 50%)',
      data: dataSensors.map((sensor) => ({
        x: sensor.time,
        y: sensor.humidity,
      })),
    },
    {
      id: 'light',
      data: dataSensors.map((sensor) => ({
        x: sensor.time,
        y: sensor.light,
      })),
    },
  ];

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Control your device!" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="200px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundImage:
              'linear-gradient(to left bottom, #9D0208, #FFFF3F)',
          }}
        >
          <StatBox
            title={dataSensors[0].temperature + 'C' || 'N/A'}
            subtitle="Temperature"
            icon={
              <DeviceThermostatOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundImage:
              'linear-gradient(to left bottom, #1c92d2, #f2fcfe)',
          }}
        >
          <StatBox
            title={dataSensors[0].humidity + '%' || 'N/A'}
            subtitle="Humidity"
            icon={
              <InvertColorsIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundImage:
              'linear-gradient(to left bottom, #fffc00, #ffffff)',
          }}
        >
          <StatBox
            title={dataSensors[0].light + 'Lux' || 'N/A'}
            subtitle="Light"
            icon={
              <LightModeIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          height="330px"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Today
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {currentTime}
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: '26px', color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart  data={chartData} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          height="330px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Device
            </Typography>
          </Box>
          {device.map((device, i) => (
            <Box
              key={`${device.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {device.name}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{device.type}</Box>
              <Button
                sx={{
                  backgroundColor:
                    device.status === '1'
                      ? colors.greenAccent[600]
                      : colors.redAccent[600],
                  padding: '5px 10px',
                  borderRadius: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  minWidth: '80px',
                  minHeight: '30px',
                  color: 'white', // Ensure the text/icon color contrasts with the background
                  '&:hover': {
                    backgroundColor:
                      device.status === '1'
                        ? colors.greenAccent[500]
                        : colors.redAccent[500],
                  },
                }}
              >
                {device.status === '0' ? (
                  <LockOutlinedIcon />
                ) : (
                  <LockOpenOutlinedIcon />
                )}
                {device.status === '1' ? 'ON' : 'OFF'}
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
