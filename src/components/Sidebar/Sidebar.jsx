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
  ChevronRight,
  FolderSpecial,
  ScienceOutlined,
  SettingsInputComponent,
  ViewColumn,
  Science as ScienceIcon,
  BuildCircle,
  TipsAndUpdates,
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
  { name: 'Studies', icon: <FolderSpecial />, path: 'studies' },
];

const ProjectTitle = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1),
  fontWeight: 500,
  color: theme.palette.text.primary,
  fontSize: '1rem',
}));

const StudyTitle = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  borderLeft: `3px solid ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.action.selected,
  margin: theme.spacing(1, 0),
}));

const ContextContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.action.selected,
  margin: theme.spacing(1, 0),
  borderLeft: `3px solid ${theme.palette.primary.main}`,
}));

const ContextLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginBottom: theme.spacing(0.5),
}));

const ContextValue = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.primary,
  fontWeight: 500,
  marginBottom: theme.spacing(1),
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

// Add sample studies data
const sampleStudies = {
  'project-a': [
    { id: 'study-1', name: 'Initial Study' },
    { id: 'study-2', name: 'Optimization Study' },
    { id: 'study-3', name: 'Validation Study' },
  ],
  'project-b': [
    { id: 'study-1', name: 'Preliminary Study' },
    { id: 'study-2', name: 'Main Study' },
    { id: 'study-3', name: 'Follow-up Study' },
  ],
  'project-c': [
    { id: 'study-1', name: 'Phase 1 Study' },
    { id: 'study-2', name: 'Phase 2 Study' },
    { id: 'study-3', name: 'Phase 3 Study' },
  ],
};

const Sidebar = ({ open, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [currentStudyId, setCurrentStudyId] = useState(null);
  const pathParts = location.pathname.split('/');
  const currentSection = pathParts[1];

  useEffect(() => {
    if (pathParts[1] === 'projects' && pathParts[2]) {
      const projectId = pathParts[2];
      setSelectedProject(projectId);
      
      if (pathParts[3] === 'studies') {
        const studyId = pathParts[4];
        setCurrentStudyId(studyId);
        if (pathParts[5]) {
          setSelectedStudy(pathParts[5]);
        } else {
          setSelectedStudy(null);
        }
      } else {
        setCurrentStudyId(null);
        setSelectedStudy(null);
      }
    } else {
      setSelectedProject(null);
      setCurrentStudyId(null);
      setSelectedStudy(null);
    }
  }, [location]);

  // Helper function to get study icon
  const getStudyIcon = (path) => {
    switch (path) {
      case 'options': return <Settings />;
      case 'system': return <SettingsInputComponent />;
      case 'column': return <ViewColumn />;
      case 'experiments': return <ScienceIcon />;
      case 'yamamoto': return <BuildCircle />;
      case 'calibration': return <TipsAndUpdates />;
      default: return <ScienceOutlined />;
    }
  };

  // Update the studies section in the project navigation:
  const getCurrentStudyName = () => {
    if (pathParts[3] === 'studies' && pathParts[4]) {
      const studyId = pathParts[4];
      const studies = sampleStudies[selectedProject?.toLowerCase().replace(' ', '-')] || [];
      const study = studies.find(s => s.id === studyId);
      return study?.name;
    }
    return null;
  };

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
              </List>

              {/* Recent Projects - Now always visible */}
              <Box sx={{ mt: 2, borderTop: 1, borderColor: 'divider' }}>
                <Typography 
                  variant="overline" 
                  sx={{ 
                    px: 2, 
                    py: 1, 
                    display: open ? 'block' : 'none',
                    opacity: open ? 1 : 0 
                  }}
                >
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
                    <ListItemIcon><FolderOutlined /></ListItemIcon>
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
                <ContextContainer>
                  <ContextLabel>You are at</ContextLabel>
                  <ContextValue>{selectedProject}</ContextValue>
                  {getCurrentStudyName() && (
                    <>
                      <ContextLabel>Study name</ContextLabel>
                      <ContextValue>{getCurrentStudyName()}</ContextValue>
                    </>
                  )}
                </ContextContainer>
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