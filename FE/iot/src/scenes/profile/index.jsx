import React from 'react';
import {
  Box,
  Link,
  Typography,
  Avatar,
  Card,
  Grid,
  useTheme,
} from '@mui/material';
import { tokens } from '../../theme';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

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
                  href="https://www.facebook.com/profile.php?id=100013589746327"
                  target="_blank"
                  rel="noopener"
                >
                  <FacebookOutlinedIcon
                    fontSize="large"
                    sx={{ color: 'blue' }}
                  />
                </Link>
                <Link
                  href="https://github.com/HuanNguyenChi"
                  target="_blank"
                  rel="noopener"
                >
                  <GitHubIcon fontSize="large" sx={{ color: 'black' }} />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/nc-huan/"
                  target="_blank"
                  rel="noopener"
                >
                  <LinkedInIcon fontSize="large" sx={{ color: '#0077b5' }} />
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
