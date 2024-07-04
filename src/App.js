import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainState from './context/MainState';
import Form from './Form';
import DisplayInfo from './DisplayInfo';

const App = () => {
  const [refreshFlag, setRefreshFlag] = useState(false);

  return (
    <>
      <MainState>
        <BrowserRouter>

          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/display/:id" element={<DisplayInfo />} />
          </Routes>
        </BrowserRouter>
      </MainState>
    </>
  );
};

export default App;
