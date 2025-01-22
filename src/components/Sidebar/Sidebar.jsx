import React, { useState, useEffect } from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton,
  ListItemIcon, 
  ListItemText, 
  Collapse,
  Button,
  Box,
  styled,
  IconButton,
  Typography,
  Tabs,
  Tab,
  Divider,
  Tooltip
} from '@mui/material';
import { 
  FolderOutlined,
  ViewColumnOutlined,
  SettingsOutlined,
  ExpandLess,
  ExpandMore,
  Dashboard,
  Science,
  Opacity,
  CloudUpload,
  List as ListIcon,
  Settings,
  Assessment,
  Biotech,
  KeyboardArrowRight,
  KeyboardBackspace,
  Menu,
  ChevronLeft,
  MenuOpen,
  Feedback as FeedbackIcon,
  ChevronRight
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const drawerWidth = 240;
const collapsedWidth = 64;  // Width when collapsed

const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
  width: open ? drawerWidth : collapsedWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  '& .MuiDrawer-paper': {
    width: open ? drawerWidth : collapsedWidth,
    boxSizing: 'border-box',
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down('md')]: {
      width: '100%',
      position: 'fixed',
      transform: open ? 'translateX(0)' : 'translateX(-100%)',
      transition: theme.transitions.create('transform', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    backgroundColor: theme.palette.grey[100],
  },
}));

const StyledListItem = styled(ListItemButton)(({ theme, selected }) => ({
  minHeight: 40,
  padding: theme.spacing(0, 2),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  ...(selected && {
    backgroundColor: theme.palette.action.selected,
  }),
  '& .MuiListItemIcon-root': {
    minWidth: 40,
  },
  justifyContent: 'center',  // Center icons when collapsed
}));

const sampleProjects = [
  'Project A',
  'Project B',
  'Project C',
];

const projectSubItems = [
  { name: 'Project Dashboard', icon: <Dashboard />, path: 'dashboard' },
  { name: 'Molecules', icon: <Science />, path: 'molecules' },
  { name: 'Buffers', icon: <Opacity />, path: 'buffers' },
  { name: 'Loads', icon: <CloudUpload />, path: 'loads' },
  { name: 'Method', icon: <ListIcon />, path: 'method' },
  { name: 'Process Parameters', icon: <Settings />, path: 'parameters' },
  { name: 'Process Quality Attributes', icon: <Assessment />, path: 'attributes' },
  { name: 'Experiments', icon: <Biotech />, path: 'experiments' },
];

const ProjectTitle = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1),
  fontWeight: 500,
  color: theme.palette.text.primary,
  fontSize: '1rem',
}));

const SidebarFooter = styled('div')(({ theme }) => ({
  position: 'sticky',
  bottom: 0,
  backgroundColor: theme.palette.grey[100],
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1),
  marginTop: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const ToggleButton = styled(IconButton)(({ theme, open }) => ({
  position: 'fixed',
  left: open ? drawerWidth - 28 : collapsedWidth - 28,
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create('left', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
  },
  zIndex: theme.zIndex.drawer + 1,
  width: 44,
  height: 44,
  '& .MuiSvgIcon-root': {
    fontSize: 24,
  },
}));

const Sidebar = ({ open, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedProject, setSelectedProject] = useState(null);
  const pathParts = location.pathname.split('/');
  const currentSection = pathParts[1];

  useEffect(() => {
    if (pathParts[1] === 'projects' && pathParts[2]) {
      setSelectedProject(pathParts[2]);
    }
  }, [location]);

  return (
    <>
      <StyledDrawer variant="permanent" open={open}>
        <Box sx={{ 
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          pt: 1,
        }}>
          {!selectedProject ? (
            // Main Navigation
            <>
              <List dense>
                <StyledListItem
                  onClick={() => navigate('/projects')}
                  selected={currentSection === 'projects'}
                >
                  <ListItemIcon><FolderOutlined /></ListItemIcon>
                  <ListItemText 
                    primary="Projects" 
                    sx={{ 
                      opacity: open ? 1 : 0,
                      display: open ? 'block' : 'none'
                    }} 
                  />
                </StyledListItem>

                <StyledListItem
                  onClick={() => navigate('/columns')}
                  selected={currentSection === 'columns'}
                >
                  <ListItemIcon><ViewColumnOutlined /></ListItemIcon>
                  <ListItemText 
                    primary="Columns" 
                    sx={{ 
                      opacity: open ? 1 : 0,
                      display: open ? 'block' : 'none'
                    }} 
                  />
                </StyledListItem>

                <StyledListItem
                  onClick={() => navigate('/systems')}
                  selected={currentSection === 'systems'}
                >
                  <ListItemIcon><SettingsOutlined /></ListItemIcon>
                  <ListItemText 
                    primary="Systems" 
                    sx={{ 
                      opacity: open ? 1 : 0,
                      display: open ? 'block' : 'none'
                    }} 
                  />
                </StyledListItem>

                {currentSection === 'projects' && (
                  <Box sx={{ mt: 2, borderTop: 1, borderColor: 'divider' }}>
                    <Typography variant="overline" sx={{ px: 2, py: 1, display: 'block' }}>
                      Recent Projects
                    </Typography>
                    {sampleProjects.map((project) => (
                      <StyledListItem
                        key={project}
                        onClick={() => {
                          setSelectedProject(project);
                          navigate(`/projects/${project.toLowerCase().replace(' ', '-')}/dashboard`);
                        }}
                      >
                        <ListItemText 
                          primary={project} 
                          sx={{ 
                            opacity: open ? 1 : 0,
                            display: open ? 'block' : 'none'
                          }} 
                        />
                      </StyledListItem>
                    ))}
                  </Box>
                )}
              </List>
              <SidebarFooter>
                <StyledListItem
                  onClick={() => navigate('/feedback')}
                  selected={currentSection === 'feedback'}
                >
                  <ListItemIcon>
                    <FeedbackIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Feedback"
                    sx={{ 
                      opacity: open ? 1 : 0,
                      display: open ? 'block' : 'none'
                    }} 
                  />
                </StyledListItem>
              </SidebarFooter>
            </>
          ) : (
            // Project Detail Navigation
            <>
              <Box sx={{ 
                px: open ? 2 : 1, 
                py: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: open ? 'flex-start' : 'center'
              }}>
                <Button
                  size="small"
                  startIcon={<KeyboardBackspace />}
                  onClick={() => {
                    setSelectedProject(null);
                    navigate('/projects');
                  }}
                  sx={{ 
                    minWidth: open ? 'auto' : 40,
                    px: open ? 2 : 1
                  }}
                >
                  {open && 'Back'}
                </Button>
              </Box>
              
              {open && (
                <Typography variant="subtitle1" sx={{ px: 2, mt: 1, fontWeight: 500 }}>
                  {selectedProject}
                </Typography>
              )}
              
              <List dense sx={{ flexGrow: 1 }}>
                {projectSubItems.map((item) => (
                  <StyledListItem
                    key={item.path}
                    onClick={() => navigate(`/projects/${selectedProject.toLowerCase().replace(' ', '-')}/${item.path}`)}
                    selected={pathParts[3] === item.path}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText 
                      primary={item.name} 
                      sx={{ 
                        opacity: open ? 1 : 0,
                        display: open ? 'block' : 'none'
                      }} 
                    />
                  </StyledListItem>
                ))}
              </List>

              <SidebarFooter>
                <StyledListItem
                  onClick={() => navigate('/feedback')}
                  selected={currentSection === 'feedback'}
                >
                  <ListItemIcon>
                    <FeedbackIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Feedback"
                    sx={{ 
                      opacity: open ? 1 : 0,
                      display: open ? 'block' : 'none'
                    }} 
                  />
                </StyledListItem>
              </SidebarFooter>
            </>
          )}
        </Box>
      </StyledDrawer>
      
      <Tooltip title={open ? "Collapse menu" : "Expand menu"} placement="right">
        <ToggleButton
          onClick={onToggle}
          open={open}
          size="small"
        >
          {open ? <ChevronLeft /> : <ChevronRight />}
        </ToggleButton>
      </Tooltip>
    </>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Sidebar; 