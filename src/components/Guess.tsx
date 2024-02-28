// react

// third party
import styled from "styled-components";

// utils

// data

// types
import { WurdilGuess } from "../App";

// components
import Tile from "./Tile";
interface GuessProps {
  guess: WurdilGuess;
}

const Guess: React.FC<GuessProps> = ({ guess }) => {
  return (
    <Wrapper className="guess">
      {guess.map((letter, index) => {
        return <Tile key={index} letter={letter} />;
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
