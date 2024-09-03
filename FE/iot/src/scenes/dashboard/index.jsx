import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import LightModeIcon from '@mui/icons-material/LightMode';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFan } from '@fortawesome/free-solid-svg-icons';
import { Box, Button, Typography, useTheme } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { tokens } from '../../theme';

import Header from '../../components/Header';
import LineChart from '../../components/LineChart';
import StatBox from '../../components/StatBox';
import AcUnitIcon from '@mui/icons-material/AcUnit';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [dataSensors, setDataSensors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8086/api/');
        setDataSensors(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    const fetchDevices = async () => {
      try {
        const response = await axios.get('http://localhost:8086/api/alldevice');
        setDevices(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
    fetchDevices();

    const interval = setInterval(() => {
      fetchData();
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  const handleToggle = async (device) => {
    try {
      alert('Sending...');
      const response = await axios.get(`http://localhost:8086/api/led`, {
        params: {
          state: device.status === true ? 'true' : 'false',
          id: device.id,
        },
      });
      const dataDevice = response.data;
      setDevices((prevDevices) =>
        prevDevices.map((d) =>
          d.id === dataDevice.device.id
            ? { ...d, status: dataDevice.action }
            : d
        )
      );
    } catch (error) {
      console.error('Error toggling device status:', error);
    }
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const chartData = [
    {
      id: 'temperature',
      data: dataSensors
        .map((sensor) => ({
          x: sensor.time,
          y: sensor.temperature,
        }))
        .reverse(),
    },
    {
      id: 'humidity',
      data: dataSensors
        .map((sensor) => ({
          x: sensor.time,
          y: sensor.humidity,
        }))
        .reverse(),
    },
    {
      id: 'light',
      data: dataSensors
        .map((sensor) => ({
          x: sensor.time,
          y: sensor.light,
        }))
        .reverse(),
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
          </Box>
          <Box height="275px" m="-20px 0 0 0">
            <LineChart data={chartData} />
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
          {devices.map((device, i) => (
            <Box
              key={`${device.id}-${i}`}
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
                  {device.type === 'LED' &&
                    (device.status ? (
                      <LightbulbIcon
                        sx={{ color: 'yellow', marginRight: '8px' }}
                      />
                    ) : (
                      <LightbulbOutlinedIcon
                        sx={{ marginRight: '8px', color: 'gray' }}
                      />
                    ))}

                  {device.type === 'FAN' && (
                    <FontAwesomeIcon
                      icon={faFan}
                      spin={device.status}
                      color={device.status ? 'blue' : 'gray'}
                      style={{ marginRight: '8px' }}
                    />
                  )}

                  {device.type === 'AIR' && (
                    <AcUnitIcon
                      sx={{
                        color: device.status ? 'blue' : 'gray',
                        marginRight: '8px',
                      }}
                    />
                  )}

                  {device.name}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{device.type}</Box>
              <Button
                sx={{
                  backgroundColor:
                    device.status === true
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
                  color: 'white',
                  '&:hover': {
                    backgroundColor:
                      device.status === true
                        ? colors.greenAccent[500]
                        : colors.redAccent[500],
                  },
                }}
                onClick={() => handleToggle(device)}
              >
                {device.status === false ? (
                  <>
                    <LockOutlinedIcon />
                    OFF
                  </>
                ) : (
                  <>
                    <LockOpenOutlinedIcon />
                    ON
                  </>
                )}
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
