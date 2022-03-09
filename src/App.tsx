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
          <Route path="/2048_React/" element={<MainMenu />} />
          <Route path="/2048_React/game" element={<Game />} />
        </Routes>
      </GameProvider>
    </div>
  );
};

export default App;
//a
