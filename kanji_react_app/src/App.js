import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// LevelList Components
import LevelList from './LevelList';
import ItemDetails from './ItemDetails'; //Placeholder Level Design
import './App.css';
import './LevelList.css';

const App = () => {
  return (
    //LevelList Components
    <div className='LevelListContainer'>
      <Router>
        <Routes>
          <Route path="/" element={<LevelList />} />
          <Route path="/item/:id" element={<ItemDetails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;