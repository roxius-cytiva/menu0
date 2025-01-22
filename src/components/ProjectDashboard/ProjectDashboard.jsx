import React from 'react';
import { 
  Paper, 
  Typography, 
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Science, ArrowForward } from '@mui/icons-material';

// Sample studies data
const sampleStudies = {
  'project-a': [
    { id: 'study-1', name: 'Initial Study', date: '2024-03-15', status: 'In Progress' },
    { id: 'study-2', name: 'Optimization Study', date: '2024-03-10', status: 'Completed' },
    { id: 'study-3', name: 'Validation Study', date: '2024-03-05', status: 'Planned' },
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

const ProjectDashboard = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const studies = sampleStudies[projectId] || [];

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">
          Project Dashboard
        </Typography>
        <Button variant="contained" startIcon={<Science />}>
          Create New Study
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Studies
      </Typography>
      
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studies.map((study) => (
              <TableRow key={study.id} hover>
                <TableCell>{study.name}</TableCell>
                <TableCell>{study.date}</TableCell>
                <TableCell>{study.status}</TableCell>
                <TableCell align="right">
                  <IconButton 
                    onClick={() => navigate(`/projects/${projectId}/studies/${study.id}`)}
                    size="small"
                  >
                    <ArrowForward />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ProjectDashboard; 