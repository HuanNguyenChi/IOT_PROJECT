import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

import SearchIcon from '@mui/icons-material/Search';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const Topbar = () => {
  const theme = useTheme(); // Lấy theme hiện tại
  const colors = tokens(theme.palette.mode); // Lấy màu sắc dựa trên mode hiện tại (sáng hoặc tối)
  const colorMode = useContext(ColorModeContext); // Lấy context để thay đổi mode

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex">
        <Typography
          variant="h3"
          color={colors.grey[100]}
          fontWeight="bold"
          mr={2}
        >
          Sero
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
        {/* Nút chuyển đổi chế độ sáng/tối */}
        <Tippy content="Theme">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? ( // Kiểm tra chế độ hiện tại
              <DarkModeOutlinedIcon /> // Biểu tượng cho chế độ tối
            ) : (
              <LightModeOutlinedIcon /> // Biểu tượng cho chế độ sáng
            )}
          </IconButton>
        </Tippy>
        {/*// Biểu tượng thông báo */}
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
