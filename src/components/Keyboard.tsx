// react

// third party
import styled from "styled-components";

// utils

// data
import { keys } from "../data/keys";
// components
import Key from "./Key.tsx";

const Keyboard: React.FC = () => {
  const renderKeys = (start: number, end: number) => {
    return keys.map((keyChar, index) => {
      if (index >= start && index <= end) {
        return <Key key={keyChar} keyChar={keyChar} index={index} />;
      }
    });
  };

  return (
    <Wrapper>
      <div className="row">{renderKeys(0, 9)}</div>
      <div className="row">{renderKeys(10, 18)}</div>
      <div className="row">{renderKeys(19, 28)}</div>
    </Wrapper>
  );
};
export default Keyboard;

const Wrapper = styled.div`
  margin-top: 2rem;
  width: 70vw;
  text-align: center;
  height: 25vh;
  .row {
    display: flex;

    place-content: center;
  }
`;
