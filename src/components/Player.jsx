import React, { useState, useEffect, useRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2"; // Import the muted icon

const Player = ({ currentSong, songs, setCurrentSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false); // State for mute functionality
  const audioRef = useRef(new Audio(currentSong.url));

  useEffect(() => {
    const audioElement = audioRef.current;
    if (isPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
    const handleTimeUpdate = () => {
      setProgress((audioElement.currentTime / audioElement.duration) * 100);
    };
    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.src = currentSong.url;
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentSong]);

  useEffect(() => {
    audioRef.current.muted = isMuted;
  }, [isMuted]);

  const handlePlayPause = () => setIsPlaying((prev) => !prev);

  const changeSong = (direction) => {
    const currentIndex = songs.indexOf(currentSong);
    const newIndex = (currentIndex + direction + songs.length) % songs.length;
    setCurrentSong(songs[newIndex]);
  };

  const handleProgressClick = (event) => {
    const { offsetWidth } = event.target;
    const clickX = event.clientX - event.target.getBoundingClientRect().left;
    const newProgress = (clickX / offsetWidth) * 100;
    setProgress(newProgress);
    audioRef.current.currentTime =
      (audioRef.current.duration * newProgress) / 100;
  };

  const handleMuteToggle = () => {
    setIsMuted((prev) => !prev); // Toggle mute state
  };

  return (
    <div className="flex flex-col gap-4 md:justify-center md:mx-[20%] mt-12">
      <div className="mb-4">
        <h2 className="text-[32px] text-white font-bold">{currentSong.name}</h2>
        <h3 className="text-white opacity-[60%] text-[16px]">
          {currentSong.artist}
        </h3>
      </div>
      <img
        src={`https://cms.samespace.com/assets/${currentSong.cover}`}
        alt="cover"
        className="lg:w-[480px] h-[450px] w-full rounded-lg"
      />
      <audio ref={audioRef} src={currentSong.url} />
      <div className="relative w-full h-2 bg-[#FFFFFF20] rounded">
        <div
          className="absolute top-0 left-0 h-full bg-white rounded"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-0 left-0 w-full h-full cursor-pointer"
          onClick={handleProgressClick}
        />
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="text-white flex items-center justify-center w-[48px] h-[48px] bg-[#FFFFFF1A] rounded-full">
          <BsThreeDots size={20} />
        </div>
        <div className="flex items-center gap-8">
          <button onClick={() => changeSong(-1)} className="text-gray-400">
            <FaBackward size={20} />
          </button>
          <button
            onClick={handlePlayPause}
            className="bg-white text-[#201606] rounded-full w-[48px] h-[48px] flex items-center justify-center"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={() => changeSong(1)} className="text-gray-400">
            <FaForward size={20} />
          </button>
        </div>
        <div
          className="text-white flex items-center justify-center w-[48px] h-[48px] bg-[#FFFFFF1A] rounded-full cursor-pointer"
          onClick={handleMuteToggle}
        >
          {isMuted ? <HiSpeakerXMark size={20} /> : <HiSpeakerWave size={20} />}
        </div>
      </div>
    </div>
  );
};

export default Player;
