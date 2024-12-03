import './App.scss';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../API';

import TaskList from '../pages/TaskList';
import TaskDetails from '../pages/TaskDetails/';

function App(): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename='/ReactTS-Guild-of-Developers'>
        <Routes>
          <Route path='/' element={<TaskList />} />
          <Route path='/task/:taskId' element={<TaskDetails />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
