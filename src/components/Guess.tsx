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
}

const Guess: React.FC<GuessProps> = ({ guess, answer }) => {
  return (
    <Wrapper className="guess">
      {guess.map((letter, index) => {
        let position = "";
        if (answer[index] === letter) {
          position = "correct";
        }
        return <Tile key={index} letter={letter} position={position} />;
      })}
    </Wrapper>
  );
};
export default Guess;

const Wrapper = styled.div`
  .guess {
    height: auto;
    display: flex;
    place-content: center;
  }
`;
