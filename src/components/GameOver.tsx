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
import Button from "./Button";

//models
interface GameOverProps {
  startGame: () => void;
  isGameOver: boolean;
  isWin: boolean;
  isPortrait: boolean;
  setIsGameOverVisible: (isVisible: boolean) => void;
  isMuted: boolean;
}

const GameOver: React.FC<GameOverProps> = ({
  startGame,
  isGameOver,
  isWin,
  isPortrait,
  setIsGameOverVisible,
  isMuted,
}) => {
  const gameOverAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const currentAudioRef = gameOverAudioRef.current;

    if (isGameOver && currentAudioRef && !isMuted) {
      currentAudioRef.play();
    }
  }, [isGameOver, isMuted]);

  return (
    <Wrapper
      data-testid="game-over"
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
      <Button
        clickHandler={startGame}
        buttonText="New Game"
        className="new-game"
      />
      <Button
        className="close-button"
        clickHandler={() => {
          setIsGameOverVisible(false);
        }}
        buttonText="Close"
      />

      <audio
        data-testid="game-over-audio"
        preload="metadata"
        ref={gameOverAudioRef}
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

  .new-game {
    bottom: 20%;
    left: 30%;
  }
  .close-button {
    bottom: 20%;
    left: 69%;
  }

  h1 {
    position: absolute;
    font-family: "mario", sans-serif;
    top: 17%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
    font-size: calc(1rem + 0.390625vw);
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
