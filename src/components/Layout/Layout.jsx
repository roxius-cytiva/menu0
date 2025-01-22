import React from 'react';
import PropTypes from 'prop-types';
import { Box, styled, useTheme, useMediaQuery } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const Layout = ({ children }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = React.useState(isDesktop);

  React.useEffect(() => {
    setOpen(isDesktop);
  }, [isDesktop]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar open={open} onToggle={() => setOpen(!open)} />
      <Main>
        {children}
      </Main>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout; 