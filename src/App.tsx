import React from "react";
import "./App.sass";
import MainMenu from "./components/MainMenu";
import { Routes, Route } from "react-router-dom";
import Game from "./components/Game";
import GameProvider from "./utils/GameProvider";

const App = () => {
  return (
    <div id="app">
      <GameProvider>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </GameProvider>
    </div>
  );
};

export default App;
