// react

// third party
import styled from "styled-components";

// utils

// data

// components

interface KeyProps {
  keyChar: string;
  index: number;
}

const Key: React.FC<KeyProps> = ({ keyChar, index }) => {
  return <Wrapper>{keyChar.toUpperCase()}</Wrapper>;
};
export default Key;

const Wrapper = styled.div`
  background-color: gray;
  font-size: 2rem;
  height: 2.5rem;
  width: 2rem;
  margin: 0.25rem;
  border-radius: 5px;
  cursor: pointer;
`;
