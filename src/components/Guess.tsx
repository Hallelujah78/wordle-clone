// react

// third party
import styled from "styled-components";

// utils

// data

// components
import Tile from "./Tile";

type WurdilGuess = [string, string, string, string, string];

const Guess: React.FC<WurdilGuess> = (item) => {
  return (
    <Wrapper className="guess">
      <Tile />
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
