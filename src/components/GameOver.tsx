// react

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
}

const GameOver: React.FC<GameOverProps> = ({ startGame }) => {
  return (
    <Wrapper
      as={motion.div}
      initial={{ x: "-50%", y: "-100vh" }}
      animate={{ y: 0, zIndex: 99 }}
    >
      <h1>GAME OVER</h1>
      <div className="image-container">
        <img
          src={lostGif}
          className="lose-image"
          alt="floating dumpster on fire"
        />
      </div>
      <button onClick={startGame}>New Game</button>
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
  }
  h1 {
    position: absolute;
    font-family: "mario", sans-serif;
    top: 10%;
    left: 20%;
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
