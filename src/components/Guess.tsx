// react

// third party
import styled from "styled-components";

// utils

// data

// types
import { GuessType } from "../App";

// components
import Tile from "./Tile";
interface GuessProps {
  guess: GuessType;
  answer: string;
  isComplete: boolean;
}

const Guess: React.FC<GuessProps> = ({ guess, answer, isComplete }) => {
  return (
    <Wrapper className="guess">
      {guess.map((letter, index) => {
        let position = "";
        if (!letter) {
          position = "empty";
        } else if (answer[index] === letter) {
          position = "correct";
        } else if (answer.includes(letter)) {
          position = "includes";
        } else {
          position = "absent";
        }
        const delay = index * 0.25;
        return (
          <Tile
            key={index}
            letter={letter}
            position={position}
            isComplete={isComplete}
            delay={delay}
          />
        );
      })}
    </Wrapper>
  );
};
export default Guess;

const Wrapper = styled.div`
  height: auto;
  display: flex;
  place-content: center;
`;
