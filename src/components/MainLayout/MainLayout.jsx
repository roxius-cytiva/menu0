import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Layout/Layout';
import PlaceholderPage from '../PlaceholderPage/PlaceholderPage';

const MainLayout = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PlaceholderPage />} />
        <Route path="/projects" element={<PlaceholderPage />} />
        <Route path="/columns" element={<PlaceholderPage />} />
        <Route path="/systems" element={<PlaceholderPage />} />
        <Route path="/feedback" element={<PlaceholderPage />} />
      </Routes>
    </Layout>
  );
};

export default MainLayout; 