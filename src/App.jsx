// src/App.js
import React, { useEffect, useState } from "react";
import { fetchSongs } from "./api/api";
import Player from "./components/Player.jsx";
import SongList from "./components/SongList.jsx";
import "./App.css";
import Logo from "./components/Logo.jsx";
import { FaBars } from "react-icons/fa";

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [showSongList, setShowSongList] = useState(false);

  useEffect(() => {
    const loadSongs = async () => {
      const songsData = await fetchSongs();
      setSongs(songsData);
      setCurrentSong(songsData[0]);
    };
    loadSongs();
  }, []);

  return (
    <div className="md:grid md:grid-cols-6 p-8 gap-4">
      <div className="col-span-1 hidden md:block">
        <Logo />
      </div>
      <img
        src="/vaibhav.jpg"
        className="absolute top-5 right-5 w-[48px] h-[48px] rounded-full object-cover md:hidden"
        alt="profile"
      />
      <div className="col-span-1 md:hidden">
        <button
          className="text-white"
          onClick={() => setShowSongList(!showSongList)}
        >
          <FaBars size={24} />
        </button>
      </div>

      <div className="col-span-2 hidden lg:block">
        <SongList
          songs={songs}
          setCurrentSong={setCurrentSong}
          currentSong={currentSong}
        />
      </div>
      {showSongList && (
        <div className="col-span-6 md:col-span-2 lg:hidden mt-2">
          <SongList
            songs={songs}
            setCurrentSong={setCurrentSong}
            currentSong={currentSong}
          />
        </div>
      )}
      <div className="w-full  md:col-span-3">
        {currentSong && (
          <Player
            currentSong={currentSong}
            songs={songs}
            setCurrentSong={setCurrentSong}
          />
        )}
      </div>
    </div>
  );
}

export default App;
