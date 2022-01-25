import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SearchResults from "./SearchResults";
import CardPage from "./CardPage";

function App() {
  const [selectedCard, setSelectedCard] = useState({} as any);

  return (
    <Router>
        <Routes>
          <Route path="/" element = { <Home setSelectedCard={setSelectedCard}/> }/>
          <Route path="/search" element = { <SearchResults setSelectedCard={setSelectedCard}/> }/>
          <Route path="/card" element = { <CardPage selectedCard={selectedCard}/> }/>
        </Routes>
    </Router>
  );
}

export default App;
