import React from 'react';
import HeaderComponent from './Components/Header';
import { Route, Routes } from 'react-router-dom';
import FormContainer from './Components/FormContainer';
import Welcome from './Components/Welcome';

function App() {
  return <>
  
    <HeaderComponent />
    <Routes>
      <Route path='/' element={<Welcome />}></Route>
      <Route path='/:airline' element={<FormContainer />}></Route>
    </Routes>
  </>
  ;
}

export default App;
