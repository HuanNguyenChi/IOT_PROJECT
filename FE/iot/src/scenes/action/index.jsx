import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  MenuItem,
  Select,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import Header from '../../components/Header';
import { tokens } from '../../theme';

const Action = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [deviceData, setDeviceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [field, setField] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [error, setError] = useState('');
  const [sort, setSort] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = useCallback(
    async (page, pageSize, sort, searchTerm, field) => {
      console.log(page, pageSize, sort, searchTerm, field);
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8086/api/datadevice`,
          {
            params: {
              page,
              size: pageSize,
              sort: sort || '',
              search: searchTerm || '',
              field: field || '',
            },
          }
        );
        setDeviceData(response.data);
      } catch (error) {
        setError('');
      } finally {
        setLoading(false);
      }
    },
    [page, pageSize, sort, searchTerm, field]
  );

  useEffect(() => {
    fetchData(page, pageSize, sort, searchTerm, field);
  }, [page, pageSize, sort, searchTerm, field]);

  const columns = [
    { field: 'id', headerName: 'ID', sortable: false },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },

    {
      field: 'timeConvert',
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
      sortable: false,
      renderCell: ({ row: { action } }) => {
        return (
          <Box
            width="60%"
            m="10px auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              action === true ? colors.greenAccent[600] : colors.redAccent[600]
            }
            borderRadius="4px"
          >
            {action === false && <LockOutlinedIcon />}
            {action === true && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
              {action === true ? 'ON' : 'OFF'}
            </Typography>
          </Box>
        );
      },
    },
  ];

  const handleFilter = () => {
    fetchData(page, pageSize, sort, searchTerm, field);
  };
  const handlePrevPage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleChangeField = (event) => {
    setField(event.target.value);
  };
  const handlePageSize = (event) => {
    const size = event.target.value;
    console.log(size);
    setPageSize(size);
    if (isNaN(parseInt(size, 10)) || parseInt(size, 10) <= 0) {
      setDeviceData([]);
      return;
    }
    fetchData(page, parseInt(size, 10), sort, searchTerm, field);
  };
  const handleSortModelChange = (sortModel) => {
    console.log(sortModel);
    if (sortModel.length > 0) {
      const { field, sort } = sortModel[0];
      setSort(sort === 'asc' ? 'increase' : 'decrease');
      setField(field);
    } else {
      setSort('');
      setField('');
    }
  };

  return (
    <Box m="20px">
      <Header title="DEVICE" subtitle="Managing the data history of device" />
      <Box display="flex" alignItems="center">
        <TextField
          sx={{
            ml: 2,
            minWidth: 300,
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
              '& .MuiInputBase-input': {
                padding: '12px 12px',
              },
            },
          }}
          placeholder="yyyy-MM-dd HH:mm:ss"
          value={searchTerm}
          onChange={handleSearchChange}
          variant="outlined"
          error={!!error}
          helperText={error}
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
          Select Field:
        </Typography>

        {/* Select dropdown */}
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
          value={field}
          onChange={handleChangeField}
          variant="outlined"
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="timeConvert">Time</MenuItem>
        </Select>
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

          '& .MuiDataGrid-footerContainer': {
            display: 'none',
          },
        }}
      >
        <DataGrid
          rows={deviceData}
          columns={columns}
          pagination={false}
          onSortModelChange={handleSortModelChange}
        />

        {/* Custom Pagination */}
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          mt={2}
        >
          <Button
            onClick={handlePrevPage}
            disabled={page === 0}
            sx={{
              backgroundColor: colors.primary[600],
              color: 'white',
              borderRadius: '50px',
              padding: '8px 16px',
              textTransform: 'none',
              fontWeight: 'bold',
              mx: 1,
            }}
          >
            Prev
          </Button>
          <Typography
            sx={{
              fontSize: '1rem',
              color: 'text.primary',
              fontWeight: 'bold',
            }}
          >
            Page {page + 1}
          </Typography>
          <Button
            onClick={handleNextPage}
            sx={{
              backgroundColor: colors.primary[600],
              color: 'white',
              borderRadius: '50px',
              padding: '8px 16px',
              textTransform: 'none',
              fontWeight: 'bold',
              mx: 1,
            }}
          >
            Next
          </Button>
          <Box ml={2} display="flex" alignItems="center">
            <Typography>Page size:</Typography>
            <TextField
              sx={{
                ml: 2,
                width: '80px',
                height: 40,
                backgroundColor: colors.primary[400],
                borderRadius: '10px',
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
                  '& .MuiInputBase-input': {
                    padding: '10px',
                    textAlign: 'center',
                  },
                },
              }}
              value={pageSize}
              onChange={handlePageSize}
              variant="outlined"
              type="number"
              inputProps={{ min: 1 }}
              error={!!error}
              helperText={error}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Action;
