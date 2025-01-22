import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import PlaceholderPage from './components/PlaceholderPage/PlaceholderPage';
import ProjectLayout from './components/ProjectLayout/ProjectLayout';
import MainLayout from './components/MainLayout/MainLayout';

function App() {
  console.log('App component rendering');
  return (
    <Router>
      <Routes>
        <Route path="/projects/:projectId/*" element={<ProjectLayout />} />
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

export default App; 