import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  TablePagination,
  Typography,
  useTheme,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { tokens } from '../../theme';

const DataSensors = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedOption, setSelectedOption] = useState('');
  const [sort, setSort] = useState(null);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async (page, size, filterParams) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8086/api/datasensor`, {
        params: {
          page,
          size,
          field: selectedOption,
          sort,
          search: searchTerm,
          ...filterParams,
        },
      });
      setData(response.data);
      console.log(response);
    } catch (error) {
      setError('Not found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page, pageSize, {});
  }, [page, pageSize]);

  const columns = [
    { field: 'id', headerName: 'ID' },
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
      field: 'time',
      headerName: 'Time',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
  ];

  const handleChangeSelectField = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };
  const handleFilter = () => {
    if (searchTerm && !selectedOption) {
      setError('Please select a field to search.');
      return;
    }
    setError('');
    fetchData(page, pageSize, {
      field: selectedOption,
      sort,
      search: searchTerm,
    });
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handlePrevPage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
      fetchData(page - 1, pageSize, {
        field: selectedOption,
        sort,
        search: searchTerm,
      });
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    fetchData(page + 1, pageSize, {
      field: selectedOption,
      sort,
      search: searchTerm,
    });
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
          value={searchTerm}
          onChange={handleSearchChange}
          variant="outlined"
          // type="number"
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
          value={selectedOption}
          onChange={handleChangeSelectField}
          variant="outlined"
        >
          <MenuItem value="temperature">Temperature</MenuItem>
          <MenuItem value="humidity">Humidity</MenuItem>
          <MenuItem value="light">Light</MenuItem>
          <MenuItem value="time">Time</MenuItem>
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
          Sort:
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
          value={sort}
          onChange={handleChangeSort}
          variant="outlined"
        >
          <MenuItem value="increase">Increase</MenuItem>
          <MenuItem value="decrease">Decrease</MenuItem>
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
        <DataGrid rows={data} columns={columns} pagination={false} />
        {/* Custom Pagination */}
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
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
        </Box>
      </Box>
    </Box>
  );
};

export default DataSensors;
