// react

// third party

import styled from "styled-components";

// utils

// data

// components

// models

interface TileProps {
  letter: string;
}

const Tile: React.FC<TileProps> = ({ letter }) => {
  return (
    <Wrapper className="letter-container">
      <div className="letter front">{letter?.toUpperCase()}</div>
      <div className="letter back">{letter?.toUpperCase()}</div>
    </Wrapper>
  );
};
export default Tile;

const Wrapper = styled.div`
  font-weight: 400;
  perspective: 1000;
  height: 3rem;
  width: 3rem;
  position: relative;
  display: inline-block;
  border: 1px solid gray;
  font-size: 2.5rem;

  text-align: center;
  line-height: 3rem;
  margin: 0.5rem;

  .letter {
    transition: all 1s ease;
    backface-visibility: hidden;
    position: absolute;
    height: 100%;
    width: 100%;
  }

  &:hover {
    .front {
      transform: rotateX(-180deg);
    }
    .back {
      transform: rotateX(0deg);
    }
  }

  .front {
    z-index: 3;
    font-family: "Libre Franklin", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
  }
  .back {
    font-family: "Libre Franklin", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    transform: rotateY(180deg);
    transform: rotateX(180deg);
    color: white;
    background-color: #438d4e;
  }
`;
