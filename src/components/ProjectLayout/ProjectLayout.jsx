import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Layout/Layout';
import PlaceholderPage from '../PlaceholderPage/PlaceholderPage';

const ProjectLayout = () => {
  return (
    <Layout>
      <Routes>
        <Route path="dashboard" element={<PlaceholderPage />} />
        <Route path="molecules" element={<PlaceholderPage />} />
        <Route path="buffers" element={<PlaceholderPage />} />
        <Route path="loads" element={<PlaceholderPage />} />
        <Route path="method" element={<PlaceholderPage />} />
        <Route path="parameters" element={<PlaceholderPage />} />
        <Route path="attributes" element={<PlaceholderPage />} />
        <Route path="experiments" element={<PlaceholderPage />} />
      </Routes>
    </Layout>
  );
};

export default ProjectLayout; 