import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import MainPage from './pages/MainPage';

function App() {
  return (
    <Router>
      <Route path="/" component={MainPage} />
    </Router>
  );
}

export default App;
