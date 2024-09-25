import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import Header from '../../components/Header';
import { tokens } from '../../theme';

const DataSensors = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedOption, setSelectedOption] = useState('null');
  const [order, setOrder] = useState(null);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [error, setError] = useState('');
  const [valueSearch, setValueSearch] = useState('');

  const fetchData = useCallback(
    async (page, size, filterParams) => {
      try {
        const response = await axios.get(
          'http://localhost:8086/api/datasensor',
          {
            params: {
              page,
              size,
              field: selectedOption || '',
              order,
              search: valueSearch || '',
              ...filterParams,
            },
          }
        );
        setData(response.data);
        console.log(data);
      } catch (error) {}
    },
    [page, pageSize, selectedOption, order, valueSearch]
  );

  useEffect(() => {
    fetchData(page, pageSize, {});
  }, [page, pageSize, fetchData]);

  const columns = [
    { field: 'id', headerName: 'ID', sortable: false },
    {
      field: 'temperature',
      headerName: 'Temperature',
      type: 'number',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'humidity',
      headerName: 'Humidity',
      flex: 1,
      type: 'number',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'light',
      headerName: 'Light',
      flex: 1,
      type: 'number',
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
  ];

  const handleChangeSelectField = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFilter = () => {
    if (valueSearch && !selectedOption) {
      setError('Please select a field to search.');
      return;
    }
    setError('');
    fetchData(page, pageSize, selectedOption, order, valueSearch);
  };

  const handleSearchChange = (event) => {
    setValueSearch(event.target.value);
  };

  const handlePageSize = (event) => {
    const size = event.target.value;
    setPageSize(size);
    if (isNaN(parseInt(size, 10)) || parseInt(size, 10) <= 0) {
      setData([]);
      setError();
      return;
    }
    setPage(0);
    setError('');
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSortModelChange = (sortModel) => {
    console.log(sortModel);
    if (sortModel.length > 0) {
      const { field, sort } = sortModel[0];
      setSelectedOption(field);
      setOrder(sort === 'asc' ? 'increase' : 'decrease');
    } else {
      setSelectedOption('');
      setOrder('');
    }
  };

  return (
    <Box m="20px">
      <Header title="DATA SENSORS" subtitle="Managing the data sensors" />
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
          placeholder="Search..."
          value={valueSearch}
          onChange={handleSearchChange}
          variant="outlined"
          type="text"
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
          defaultValue='null'
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
          value={selectedOption}
          onChange={handleChangeSelectField}
          variant="outlined"
        >
          <MenuItem value='null'>All</MenuItem>
          <MenuItem value="temperature">Temperature</MenuItem>
          <MenuItem value="humidity">Humidity</MenuItem>
          <MenuItem value="light">Light</MenuItem>
          <MenuItem value="time">Time</MenuItem>
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
          rows={data}
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
      </Box>
    </Box>
  );
};

export default DataSensors;
