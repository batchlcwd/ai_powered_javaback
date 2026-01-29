import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import UploadPage from './pages/UploadPage';
import ViewPage from './pages/ViewPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<UploadPage />} />
        <Route path="view" element={<ViewPage />} />
      </Route>
    </Routes>
  );
}

export default App;
