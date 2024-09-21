import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../theme';

const StatBox = ({ title, subtitle, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px" position="relative">
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Box
            position="absolute"
            top="-40px"
            right="0"
         
          >
            {icon}
          </Box>
          <Typography variant="h4" fontWeight="bold" sx={{ color: 'white' }}>
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: 'white' }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
