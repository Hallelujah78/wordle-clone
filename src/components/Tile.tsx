// react

// third party
import styled from "styled-components";

// utils

// data

// components

// models
type WurdilGuess = [string, string, string, string, string];

type Guesses = [
  WurdilGuess,
  WurdilGuess,
  WurdilGuess,
  WurdilGuess,
  WurdilGuess,
  WurdilGuess
];

const Tile: React.FC = () => {
  return (
    <Wrapper className="letter-container">
      <div className="letter front" id="0">
        {/* {guesses[0][0].toUpperCase()} */}
      </div>
      <div className="letter back" id="0">
        {/* {guesses[0][0].toUpperCase()} */}
      </div>
    </Wrapper>
  );
};
export default Tile;

const Wrapper = styled.div``;
