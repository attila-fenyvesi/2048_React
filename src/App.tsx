import "./App.sass";
import MainMenu from "./components/MainMenu";
import { Routes, Route } from "react-router-dom";
import Game from "./components/Game";

const App = () => {
  return (
    <div id="app">
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="game" element={<Game />} />
      </Routes>
    </div>
  );
};

export default App;
