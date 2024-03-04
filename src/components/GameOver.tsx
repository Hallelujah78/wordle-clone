// react
import { useRef, useEffect } from "react";
// third party
import styled from "styled-components";
import { motion } from "framer-motion";
// utils

// assets
import lostGif from "../assets/floating_dumpster.gif";

// data

// components

//models
interface GameOverProps {
  startGame: () => void;
  isGameOver: boolean;
  isWin: boolean;
  isPortrait: boolean;
}

const GameOver: React.FC<GameOverProps> = ({
  startGame,
  isGameOver,
  isWin,
  isPortrait,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const currentAudioRef = audioRef.current;
    if (isGameOver && currentAudioRef) {
      currentAudioRef.play();
    }
  }, [isGameOver]);

  return (
    <Wrapper
      style={{
        width: `${isPortrait ? "85vw" : "85vh"}`,
        top: `${isPortrait ? "12vh" : "12vh"}`,
      }}
      as={motion.div}
      initial={{ x: "-50%", y: "-100vh" }}
      animate={{ y: 0, zIndex: 99 }}
    >
      <h1>{isGameOver && !isWin ? "YOU LOSE" : "YOU WIN"}</h1>
      <div className="image-container">
        <img
          style={{
            width: `${isPortrait ? "85vw" : "85vh"}`,
            top: `${isPortrait ? "12vh" : "12vh"}`,
          }}
          src={lostGif}
          className="lose-image"
          alt="floating dumpster on fire"
        />
      </div>
      <motion.button
        initial={{ backgroundPosition: "0% 0%" }}
        whileHover={{ backgroundPosition: "200% 0%" }}
        onClick={startGame}
      >
        New Game
      </motion.button>
      <audio
        ref={audioRef}
        src={isGameOver && !isWin ? "you_lose.mp3" : "you_win.mp3"}
      ></audio>
    </Wrapper>
  );
};
export default GameOver;

const Wrapper = styled.div`
  width: 85vw;
  height: auto;
  display: grid;
  place-content: center;
  position: absolute;
  left: 50vw;
  border-radius: 50%;

  button {
    background-image: linear-gradient(
      to right,
      #e43a15 0%,
      #e65245 51%,
      #e0a395 100%
    );
    background-size: 200% 200%;
    transition: 0.5s;
    box-shadow: 0 0 20px #eee;
    position: absolute;
    bottom: 12%;
    left: 50%;
    transform: translateX(-50%);
    font-size: calc(1.25rem + 0.390625vw);
    padding: 0.5rem 1.5rem;
    border-radius: 1rem;
    border: none;
    color: white;
    cursor: pointer;
  }
  h1 {
    position: absolute;
    font-family: "mario", sans-serif;
    top: 17%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
    font-size: calc(1.25rem + 0.390625vw);
  }

  color: black;
  background-color: transparent;

  .image-container {
    border-radius: 50%;
  }
  .lose-image {
    border-radius: 50%;
    top: 50vh;
  }
`;
