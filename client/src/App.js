import React from 'react';  
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import NewSong from "./pages/NewSong";
import NewArtist from "./pages/newartist";
function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newsong" element={<NewSong />} />
          <Route path="/newartist" element={<NewArtist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
