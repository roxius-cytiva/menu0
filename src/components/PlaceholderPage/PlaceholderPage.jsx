import React from 'react';
import { Paper, Typography, Box, IconButton } from '@mui/material';
import { useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const PlaceholderPage = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  
  const getPageTitle = () => {
    if (pathParts.length === 0) return 'Home';
    if (pathParts.length === 1) return pathParts[0].charAt(0).toUpperCase() + pathParts[0].slice(1);
    if (pathParts[0] === 'projects' && pathParts.length > 2) {
      const project = pathParts[1].replace('-', ' ');
      const page = pathParts[2].charAt(0).toUpperCase() + pathParts[2].slice(1);
      return `${project} - ${page}`;
    }
    return pathParts[pathParts.length - 1].charAt(0).toUpperCase() + pathParts[pathParts.length - 1].slice(1);
  };

  return (
    <Paper 
      sx={{ 
        p: { xs: 2, sm: 3 }, 
        mx: 0,
        minHeight: '80vh',
        width: '100%',
        boxShadow: 'none',
      }}
    >
      <Typography 
        variant="h4" 
        gutterBottom
        sx={{
          fontSize: { xs: '1.5rem', sm: '2.125rem' }
        }}
      >
        {getPageTitle()}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography>
          This is a placeholder page for: {location.pathname}
        </Typography>
      </Box>
    </Paper>
  );
};

export default PlaceholderPage; 