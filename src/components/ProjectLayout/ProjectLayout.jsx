import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Layout/Layout';
import PlaceholderPage from '../PlaceholderPage/PlaceholderPage';
import ProjectDashboard from '../ProjectDashboard/ProjectDashboard';
import StudiesList from '../StudiesList/StudiesList';

const ProjectLayout = () => {
  return (
    <Layout>
      <Routes>
        <Route path="dashboard" element={<ProjectDashboard />} />
        <Route path="molecules" element={<PlaceholderPage />} />
        <Route path="buffers" element={<PlaceholderPage />} />
        <Route path="loads" element={<PlaceholderPage />} />
        <Route path="method" element={<PlaceholderPage />} />
        <Route path="parameters" element={<PlaceholderPage />} />
        <Route path="attributes" element={<PlaceholderPage />} />
        <Route path="studies" element={<StudiesList />} />
        <Route path="studies/:studyId" element={<PlaceholderPage />} />
      </Routes>
    </Layout>
  );
};

export default ProjectLayout; 