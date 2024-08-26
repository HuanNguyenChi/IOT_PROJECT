import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { tokens } from '../../theme';

const Action = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [deviceData, setDeviceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [fromValue, setFromValue] = useState();
  const [toValue, setToValue] = useState();
  const [error, setError] = useState('');
  const [sort, setSort] = useState(null);

  const fetchData = async (page, size, startTime, endTime, sort) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8086/api/datadevice`, {
        params: {
          page,
          size,
          startTime: startTime || '', // Truyền tham số startTime nếu có
          endTime: endTime || '', // Truyền tham số endTime nếu có
          sort, // Thêm tham số sort nếu cần
        },
      });
      setDeviceData(response.data);
      console.log(response);
    } catch (error) {
      setError('Not found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page, pageSize, fromValue, toValue, sort);
  }, [page, pageSize, fromValue, toValue, sort]);

  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row: { status } }) => {
        return (
          <>
            <Box
              width="60%"
              m="10px auto"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={
                status === '1' ? colors.greenAccent[600] : colors.redAccent[600]
              }
              borderRadius="4px"
            >
              {status === '0' && <LockOutlinedIcon />}
              {status === '1' && <LockOpenOutlinedIcon />}
              <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
                {status === '1' ? 'ON' : 'OFF'}
              </Typography>
            </Box>
          </>
        );
      },
    },
    {
      field: 'time',
      headerName: 'Time',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'action',
      headerName: 'Action',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: ({ row: { action } }) => {
        return (
          <Box
            width="60%"
            m="10px auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              action === '1' ? colors.greenAccent[600] : colors.redAccent[600]
            }
            borderRadius="4px"
          >
            {action === '0' && <LockOutlinedIcon />}
            {action === '1' && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
              {action === '1' ? 'ON' : 'OFF'}
            </Typography>
          </Box>
        );
      },
    },
  ];
  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };
  const handleFromValueChange = (event) => {
    setFromValue(event.target.value);
  };
  const handleToValueChange = (event) => {
    setToValue(event.target.value);
  };
  const handleFilter = () => {
    fetchData(page, pageSize, fromValue, toValue, sort);
  };
  return (
    <Box m="20px">
      <Header title="DEVICE" subtitle="Managing the data history of device" />
      <Box display="flex" alignItems="center">
        <Typography
          sx={{
            ml: 2,
            fontSize: '1rem',
            color: 'text.primary',
            mt: '12px',
            fontWeight: 'bold',
          }}
        >
          Sort by:
        </Typography>

        {/* Select sort */}
        <Select
          defaultValue="option1"
          sx={{
            ml: 2,
            minWidth: 120,
            height: 40,
            backgroundColor: colors.primary[400],
            borderRadius: '50px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none', // Remove the border
              },
              '&:hover fieldset': {
                border: 'none', // Remove border on hover
              },
              '&.Mui-focused fieldset': {
                border: 'none', // Remove border when focused
              },
              '& .MuiSelect-select': {
                padding: '0 12px', // Adjust padding to ensure text is properly positioned
              },
            },
          }}
          value={sort}
          onChange={handleChangeSort}
          variant="outlined"
        >
          <MenuItem value="increase">Increase</MenuItem>
          <MenuItem value="decrease">Decrease</MenuItem>
        </Select>
        <Typography
          sx={{
            ml: 2,
            fontSize: '1rem',
            color: 'text.primary',
            mt: '12px',
            fontWeight: 'bold',
          }}
        >
          From:
        </Typography>

        {/* Input field for 'from' value */}
        <TextField
          sx={{
            ml: 2,
            minWidth: 120,
            height: 40,
            backgroundColor: colors.primary[400],
            borderRadius: '50px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none', // Remove the border
              },
              '&:hover fieldset': {
                border: 'none', // Remove border on hover
              },
              '&.Mui-focused fieldset': {
                border: 'none', // Remove border when focused
              },
              '& .MuiInputBase-input': {
                padding: '12px 12px', // Adjust padding to ensure text is properly positioned
              },
            },
          }}
          value={fromValue}
          onChange={handleFromValueChange}
          variant="outlined"
          type="number"
        />

        <Typography
          sx={{
            ml: 2,
            fontSize: '1rem',
            color: 'text.primary',
            mt: '12px',
            fontWeight: 'bold',
          }}
        >
          To:
        </Typography>

        {/* Input field for 'to' value */}
        <TextField
          sx={{
            ml: 2,
            minWidth: 120,
            height: 40,
            backgroundColor: colors.primary[400],
            borderRadius: '50px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none', // Remove the border
              },
              '&:hover fieldset': {
                border: 'none', // Remove border on hover
              },
              '&.Mui-focused fieldset': {
                border: 'none', // Remove border when focused
              },
              '& .MuiInputBase-input': {
                padding: '12px 12px', // Adjust padding to ensure text is properly positioned
              },
            },
          }}
          value={toValue}
          onChange={handleToValueChange}
          variant="outlined"
          type="number"
        />

        {/* Filter button */}
        <Button
          variant="contained"
          sx={{
            ml: 2,
            backgroundColor: colors.primary[600],
            color: 'white',
            borderRadius: '50px',
            padding: '8px 16px',
            textTransform: 'none',
            fontWeight: 'bold',
          }}
          onClick={handleFilter}
        >
          Filter
        </Button>
      </Box>
      <Box
        m="40px 0 0 0"
        height="77vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
            fontSize: '0.9rem',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
            fontSize: '0.9rem',
          },

          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
            fontSize: '0.9rem',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={deviceData}
          columns={columns}
          loading={loading}
          page={page}
          pageSize={pageSize}
          // rowCount={rowCount}
          pagination
          paginationMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </Box>
    </Box>
  );
};

export default Action;
