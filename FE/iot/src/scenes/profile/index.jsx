import FormatColorTextOutlinedIcon from '@mui/icons-material/FormatColorTextOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import {
  Avatar,
  Box,
  Card,
  Grid,
  Link,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { tokens } from '../../theme';

const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      className="gradient-custom-2"
      sx={{ backgroundColor: colors.primary[900], py: 5, height: '91%' }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: '100%' }}
      >
        <Grid item lg={9} xl={7}>
          <Card>
            <Box
              className="rounded-top"
              sx={{
                backgroundColor: colors.grey[400],
                height: '200px',
                color: 'white',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Box
                sx={{
                  ml: 4,
                  mt: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  width: '150px',
                }}
              >
                <Avatar
                  src={`../../assets/user.jpg`}
                  alt="Generic placeholder image"
                  sx={{ width: 150, height: 150, mt: 4, mb: 2, zIndex: 1 }}
                />
              </Box>
              <Box sx={{ ml: 3, mt: '130px' }}>
                <Typography variant="h5">Nguyen Chi Huan</Typography>
                <Typography>Ha Noi</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                p: 4,
                backgroundColor: '#f8f9fa',
                color: 'black',
                display: 'flex',
                justifyContent: 'right',
                textAlign: 'right',
                py: 1,
              }}
            >
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Link
                  href="https://drive.google.com/file/d/1kyCOEd543WZfrAk3wf_0ZtF826EE0OPA/view?usp=sharing"
                  target="_blank"
                  rel="noopener"
                >
                  <PictureAsPdfIcon fontSize="large" sx={{ color: 'blue' }} />
                </Link>
                <Link
                  href="https://github.com/HuanNguyenChi"
                  target="_blank"
                  rel="noopener"
                >
                  <GitHubIcon fontSize="large" sx={{ color: 'black' }} />
                </Link>
                <Link
                  href="https://winter-shadow-493858.postman.co/workspace/Team-Workspace~5270d1fb-652d-44c7-8925-68bdb042e641/collection/26714581-76087e94-0864-4678-aceb-5132fabf7566?action=share&creator=26714581"
                  target="_blank"
                  rel="noopener"
                >
                  <FormatColorTextOutlinedIcon
                    fontSize="large"
                    sx={{ color: '#0077b5' }}
                  />
                </Link>
              </Box>
            </Box>
            <Box sx={{ p: 4, color: 'black' }}>
              <Box className="mb-5">
                <Typography variant="h6" className="lead fw-normal mb-1">
                  About
                </Typography>
                <Box sx={{ p: 4, backgroundColor: '#f8f9fa' }}>
                  <Typography className="font-italic mb-1">
                    Posts and Telecommunications Institute of Technology
                  </Typography>
                  <Typography className="font-italic mb-1">
                    Student code: B21DCCN405
                  </Typography>
                  <Typography className="font-italic mb-0">
                    Major: Information Technology
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
