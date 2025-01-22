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

// Sample studies data (same as in ProjectDashboard)
const sampleStudies = {
  'project-a': [
    { id: 'study-1', name: 'Initial Study', date: '2024-03-15', status: 'In Progress' },
    { id: 'study-2', name: 'Optimization Study', date: '2024-03-10', status: 'Completed' },
    { id: 'study-3', name: 'Validation Study', date: '2024-03-05', status: 'Planned' },
  ],
  // ... other projects
};

const StudiesList = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const studies = sampleStudies[projectId] || [];

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Studies</Typography>
        <Button variant="contained" startIcon={<Science />}>
          Create New Study
        </Button>
      </Box>
      
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

export default StudiesList; 