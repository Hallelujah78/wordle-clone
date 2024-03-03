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
}

const GameOver: React.FC<GameOverProps> = ({ startGame, isGameOver }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const currentAudioRef = audioRef.current;
    if (isGameOver) {
      currentAudioRef!.play();
    }
  }, [isGameOver]);

  return (
    <Wrapper
      as={motion.div}
      initial={{ x: "-50%", y: "-100vh" }}
      animate={{ y: 0, zIndex: 99 }}
    >
      <h1>YOU LOSE</h1>
      <div className="image-container">
        <img
          src={lostGif}
          className="lose-image"
          alt="floating dumpster on fire"
        />
      </div>
      <button onClick={startGame}>New Game</button>
      <audio ref={audioRef} src="you_lose.mp3"></audio>
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

  top: 20vh;
  left: 50vw;
  border-radius: 50%;

  button {
    position: absolute;
    bottom: 12%;
    left: 50%;
    transform: translateX(-50%);
    font-size: calc(1.25rem + 0.390625vw);
    padding: 0.5rem 0.75rem;
    border-radius: 1rem;
  }
  h1 {
    position: absolute;
    font-family: "mario", sans-serif;
    top: 17%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    font-size: calc(1.25rem + 0.390625vw);
  }

  color: black;
  background-color: transparent;

  .image-container {
    border-radius: 50%;
  }
  .lose-image {
    width: 85vw;
    border-radius: 50%;
  }
`;
