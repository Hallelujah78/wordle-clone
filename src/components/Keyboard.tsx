// react

// third party
import styled from "styled-components";
import { TbBackspaceFilled } from "react-icons/tb";

// utils

// data

// components
import Key from "./Key.tsx";

//models
import { KeyType } from "../models/KeyType.model.ts";

interface KeyboardProps {
  keyboardState: KeyType[];
}

const Keyboard: React.FC<KeyboardProps> = ({ keyboardState }) => {
  const renderKeys = (start: number, end: number) => {
    return keyboardState.map((keyChar, index) => {
      if (index >= start && index <= end) {
        const keyToUpdate = keyboardState.find((keyObj) => {
          return keyObj.key === keyChar.key;
        })!;

        const bgColor = keyToUpdate.color;
        const delay = index * 0.05;
        const xStart = index % 2 === 0 ? -50 : 50;
        return (
          <Key
            xStart={xStart}
            delay={delay}
            bgColor={bgColor}
            key={keyChar.key}
            keyChar={keyChar}
            icon={
              keyChar.key === "Backspace" ? (
                <TbBackspaceFilled className="icon" />
              ) : null
            }
          />
        );
      }
    });
  };

  return (
    <Wrapper data-testid="keyboard">
      <div className="row">{renderKeys(0, 9)}</div>
      <div className="row">{renderKeys(10, 18)}</div>
      <div className="row">{renderKeys(19, 28)}</div>
    </Wrapper>
  );
};
export default Keyboard;

const Wrapper = styled.div`
  margin-top: 1vh;
  width: 98vw;
  text-align: center;
  height: auto;
  .row {
    display: flex;
    place-content: center;
  }
`;
