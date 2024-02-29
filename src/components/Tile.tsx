// react

// third party
import { motion } from "framer-motion";
import styled from "styled-components";

// utils

// data

// components

// animation
const variants = {
  completeFront: { rotateX: -180 },
  notCompleteFront: { rotateX: 0 },
  completeBack: { rotateX: 0 },
  notCompleteBack: { rotateX: -180 },
};

// models

interface TileProps {
  letter: string;
  position: string;
  isComplete: boolean;
  delay: number;
}

const Tile: React.FC<TileProps> = ({ letter, position, isComplete, delay }) => {
  console.log(isComplete);
  return (
    <Wrapper className="letter-container">
      <motion.div
        variants={variants}
        animate={isComplete ? "completeFront" : "notCompleteFront"}
        transition={{ delay, duration: 1.1 }}
        className="letter"
      >
        {letter?.toUpperCase()}
      </motion.div>
      <motion.div
        variants={variants}
        animate={isComplete ? "completeBack" : "notCompleteBack"}
        transition={{ delay, duration: 1.1 }}
        className={`${
          position === "correct"
            ? "green"
            : position === "includes"
            ? "yellow"
            : "darkgray"
        } letter`}
      >
        {letter?.toUpperCase()}
      </motion.div>
    </Wrapper>
  );
};
export default Tile;

const Wrapper = styled.div`
  font-weight: 600;
  height: 3.25rem;
  width: 3.25rem;
  position: relative;
  display: inline-block;
  border: 2px solid gray;
  font-size: 2.25rem;
  text-align: center;
  line-height: 3.25rem;
  margin: 0.15rem;

  .letter {
    backface-visibility: hidden;
    position: absolute;
    transition: all 1.1s ease-in;
    height: 100%;
    width: 100%;
  }

  .green {
    background: #438d4e;
  }
  .darkgray {
    background: #3a3a3c;
  }
  .yellow {
    background: #b59f3b;
  }
`;
