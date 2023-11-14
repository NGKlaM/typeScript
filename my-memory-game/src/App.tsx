// src/App.tsx
import './App.css';
import React from 'react';
import GameBoard from './components/GameBoard';

const App: React.FC = () => {
  return (
    <div className="App">
      <GameBoard /><h1>hello</h1>
    </div>
  );
};

export default App;
