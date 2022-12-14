import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Register, Payment} from './pages';

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Register />} />
        <Route path = "/payments/:id" element = {<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
