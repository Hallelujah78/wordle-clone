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
  hasLetter: {
    scale: [1, 1.03, 0.97, 1],
    borderRadius: ["0%", "50%", "0%"],
    rotate: [0, 180, 360],
  },
};

// models

interface TileProps {
  letter: string;
  position: string;
  isComplete: boolean;
  delay: number;
}

const Tile: React.FC<TileProps> = ({ letter, position, isComplete, delay }) => {
  return (
    <>
      <Wrapper>
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
          transition={{ delay, duration: 0.5 }}
          className={`${
            position === "correct"
              ? "green"
              : position === "includes"
              ? "yellow"
              : position === "absent"
              ? "darkgray"
              : null
          } letter`}
        >
          {letter?.toUpperCase()}
        </motion.div>
        <motion.div
          variants={variants}
          animate={letter && "hasLetter"}
          transition={{ duration: 0.5 }}
          className="border"
        ></motion.div>
      </Wrapper>
    </>
  );
};
export default Tile;

const Wrapper = styled.div`
  font-weight: 600;
  height: 3.25rem;
  width: 3.25rem;
  position: relative;
  display: inline-block;
  border: 2px solid transparent;
  font-size: 2.25rem;
  text-align: center;
  line-height: 3.25rem;
  margin: 0.15rem;

  .letter {
    backface-visibility: hidden;
    position: absolute;
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
  .border {
    height: 3.25rem;
    width: 3.25rem;
    position: absolute;
    display: inline-block;
    top: -4px;
    right: -0.27rem;
    border: 2px solid gray;
    font-size: 2.25rem;
    text-align: center;
    line-height: 3.25rem;
    margin: 0.15rem;
  }
`;
