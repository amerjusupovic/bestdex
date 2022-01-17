import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SearchResults from "./SearchResults";
import { QueryParamProvider } from "use-query-params"

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element = { <Home/> }/>
          <Route path="/search" element = { <SearchResults/> }/>
        </Routes>
    </Router>
  );
}

export default App;
