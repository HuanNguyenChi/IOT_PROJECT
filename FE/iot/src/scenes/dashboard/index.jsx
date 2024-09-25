import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import LightModeIcon from '@mui/icons-material/LightMode';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFan } from '@fortawesome/free-solid-svg-icons';
import {
  Box,
  Button,
  Typography,
  useTheme,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
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
  const [pageSize, setPageSize] = useState(20);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8086/api/', {
        params: {
          pageSize,
        },
      });
      setDataSensors(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [pageSize]);

  const fetchDevices = async () => {
    try {
      const response = await axios.get('http://localhost:8086/api/alldevice');
      setDevices(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDevices();

    const interval = setInterval(() => {
      fetchData(pageSize);
    }, 2000);

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [fetchData]);

  const handleToggle = async (device) => {
    try {
      alert('Bạn có muốn bạt thiết bị không?');
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
  const handlePageSize = (event) => {
    const size = event.target.value;
    setPageSize(size);
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const chartData = [
    {
      id: 'temperature',
      data: dataSensors
        .map((sensor) => ({
          x: sensor.timeConvert,
          y: sensor.temperature,
        }))
        .reverse(),
    },
    {
      id: 'humidity',
      data: dataSensors
        .map((sensor) => ({
          x: sensor.timeConvert,
          y: sensor.humidity,
        }))
        .reverse(),
    },
    {
      id: 'light',
      data: dataSensors
        .map((sensor) => ({
          x: sensor.timeConvert,
          y: sensor.light,
        }))
        .reverse(),
    },
  ];

  const getBackgroundColor = (value, type) => {
    if (type === 'temperature') {
      if (value > 30)
        return 'linear-gradient(to left bottom, #fd1d1d, #ed1d89)';
      if (value > 20)
        return 'linear-gradient(to left bottom, #fd592b, #fd1d1d)';
      return 'linear-gradient(to left bottom, #fcc345, #fd592b)';
    }

    if (type === 'humidity') {
      if (value > 70)
        return 'linear-gradient(to left bottom, #2dfded, #49e2d6)';
      if (value > 40)
        return 'linear-gradient(to left bottom, #49e2d6, #6ebeb8)';
      return 'linear-gradient(to left bottom, #6ebeb8, #2269c3)';
    }

    if (type === 'light') {
      if (value > 700)
        return 'linear-gradient(to left bottom, #fafe2e, #f9ff11)';
      if (value > 350)
        return 'linear-gradient(to left bottom, #f4f75c, #fafe2e)';
      return 'linear-gradient(to left bottom, #edf1bb, #f4f75c)';
    }
  };

  return (
    <Box m="20px">
      {/* HEADER */}

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Control your device!" />
        <Box
          ml="2"
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Typography>Page size:</Typography>
          <Select
            defaultValue="option1"
            sx={{
              ml: 2,
              minWidth: 80,
              height: 40,
              backgroundColor: colors.primary[400],
              borderRadius: '50px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
                '& .MuiSelect-select': {
                  padding: '0 12px',
                },
              },
            }}
            value={pageSize}
            onChange={handlePageSize}
          >
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="15">15</MenuItem>
            <MenuItem value="20">20</MenuItem>
            <MenuItem value="25">25</MenuItem>
            <MenuItem value="100">100</MenuItem>
          </Select>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="200px"
        gap="20px"
      >
        {/* ROW 1 */}

        {/* STAT BOX TEMPERATURE */}
        <Box
          gridColumn="span 4"
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundImage: getBackgroundColor(
              dataSensors[0].temperature,
              'temperature'
            ),
          }}
        >
          <StatBox
            title={dataSensors[0].temperature + 'C'}
            subtitle="Temperature"
            icon={
              <DeviceThermostatOutlinedIcon
                sx={{ color: 'white', fontSize: '26px' }}
              />
            }
          />
        </Box>

        {/* STAT BOX HUMIDITY */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundImage: getBackgroundColor(
              dataSensors[0].humidity,
              'humidity'
            ),
          }}
        >
          <StatBox
            title={dataSensors[0].humidity + '%'}
            subtitle="Humidity"
            icon={
              <InvertColorsIcon sx={{ color: 'white', fontSize: '26px' }} />
            }
          />
        </Box>

        {/* STAT BOX LIGHT */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundImage: getBackgroundColor(dataSensors[0].light, 'light'),
          }}
        >
          <StatBox
            title={dataSensors[0].light + 'Lux'}
            subtitle="Light"
            icon={<LightModeIcon sx={{ color: 'white', fontSize: '26px' }} />}
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
          <Box height="275px" m="-20px 0 0 0" width="800px">
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
                    device.status === false
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
                      device.status === false
                        ? colors.greenAccent[500]
                        : colors.redAccent[500],
                  },
                }}
                onClick={() => handleToggle(device)}
              >
                {device.status === true ? (
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
