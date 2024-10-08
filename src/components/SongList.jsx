import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const SongList = ({ songs, setCurrentSong, currentSong }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [durations, setDurations] = useState({});
  const [activeTab, setActiveTab] = useState("forYou");

  useEffect(() => {
    const filtered = songs.filter(
      (song) =>
        (song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (activeTab === "forYou" || song.top_track)
    );
    setFilteredSongs(filtered);
  }, [searchQuery, songs, activeTab]);

  useEffect(() => {
    const fetchDurations = async () => {
      const newDurations = {};
      await Promise.all(
        songs.map((song, index) => {
          return new Promise((resolve) => {
            const audio = new Audio(song.url);
            audio.addEventListener("loadedmetadata", () => {
              newDurations[index] = Math.floor(audio.duration);
              resolve();
            });
          });
        })
      );
      setDurations(newDurations);
    };
    fetchDurations();
  }, [songs]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div>
      <div className="flex gap-6 md:px-3 ">
        <button
          className={`text-[24px] font-bold ${
            activeTab === "forYou"
              ? " text-white"
              : " text-white opacity-[50%]"
          }`}
          onClick={() => setActiveTab("forYou")}
        >
          For You
        </button>
        <button
          className={`text-[24px] font-bold ${
            activeTab === "topTracks"
              ? "text-white"
              : "text-white opacity-[50%]"
          }`}
          onClick={() => setActiveTab("topTracks")}
        >
          Top Tracks
        </button>
      </div>

      <div className="relative pb-10 pt-5 md:px-3">
        <input
          type="text"
          placeholder="Search Song, Artist"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-[18px] py-[8px] border-none rounded-lg bg-[#FFFFFF14] text-white opacity-[50%] w-full text-[18px]"
        />
        <FaSearch className="absolute right-6 top-[33px] w-4 h-4 text-white opacity-[50%]" />
      </div>

      <div className="flex flex-col gap-2 text-white cursor-pointer">
        {filteredSongs.map((song, index) => (
          <div
            key={index}
            className={`flex justify-between items-center ${
              currentSong?.id === song.id ? "bg-[#FFFFFF14] rounded-lg" : ""
            }`}
            onClick={() => setCurrentSong(song)}
          >
            <div className="flex items-center gap-4 px-3 py-2">
              <img
                src={`https://cms.samespace.com/assets/${song.cover}`}
                alt="cover"
                className="w-[48px] h-[48px] rounded-[56px]"
              />
              <div>
                <h3 className="text-lg text-[18px]">{song.name}</h3>
                <p className="text-white opacity-[60%] text-[14px]">
                  {song.artist}
                </p>
              </div>
            </div>
            <div className="px-3 py-2">
              <p className="text-white opacity-[60%] text-[18px]">
                {formatDuration(durations[index])}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;
