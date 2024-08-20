import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { mockDataHistoryDevice } from '../../data/mockData';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Header from '../../components/Header';

const Action = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell',
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
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              status === '1'
                ? colors.greenAccent[600]
                : status === '0'
                ? colors.redAccent[700]
                : colors.redAccent[700]
            }
            borderRadius="4px"
          >
            {status === '0' && <LockOutlinedIcon />}
            {status === '1' && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
              {status === '1' ? 'ON' : 'OFF'}
            </Typography>
          </Box>
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
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              action === '1'
                ? colors.greenAccent[600]
                : action === '0'
                ? colors.redAccent[700]
                : colors.redAccent[700]
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

  return (
    <Box m="20px">
      <Header title="DEVICE" subtitle="Managing the data history of device" />
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
          '& .name-column--cell': {
            color: colors.greenAccent[300],
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
        <DataGrid rows={mockDataHistoryDevice} columns={columns} />
      </Box>
    </Box>
  );
};

export default Action;
