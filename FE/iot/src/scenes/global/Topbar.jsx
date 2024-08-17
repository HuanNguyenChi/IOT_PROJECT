import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Topbar = () => {
  const theme = useTheme(); // Lấy theme hiện tại
  const colors = tokens(theme.palette.mode); // Lấy màu sắc dựa trên mode hiện tại (sáng hoặc tối)

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex">
        <Typography
          variant="h3"
          color={colors.grey[100]}
          fontWeight="bold"
          mr={2}
        >
          IOT
        </Typography>
        {/* SEARCH BAR */}
        <Box
          display="flex"
          backgroundColor={colors.primary[400]} // Đặt màu nền cho thanh tìm kiếm
          borderRadius="50px" // Bo tròn các góc
        >
          {/* Thanh tìm kiếm */}
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <Tippy content="Notification">
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
        </Tippy>
      </Box>
    </Box>
  );
};

export default Topbar;
