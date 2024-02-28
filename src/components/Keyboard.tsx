// react

// third party
import styled from "styled-components";
import { TbBackspaceFilled } from "react-icons/tb";

// utils

// data
import { keys } from "../data/keys";
// components
import Key from "./Key.tsx";

//models
import { KeyType } from "../App.tsx";

interface KeyboardProps {
  keyboardState: KeyType[];
}

const Keyboard: React.FC<KeyboardProps> = ({ keyboardState }) => {
  const renderKeys = (start: number, end: number) => {
    return keys.map((keyChar, index) => {
      if (index >= start && index <= end) {
        const keyToUpdate = keyboardState.find((keyObj) => {
          return keyObj.key === keyChar;
        })!;
        const bgColor = keyToUpdate.color;

        return (
          <Key
            bgColor={bgColor}
            key={keyChar}
            keyChar={keyChar}
            icon={
              keyChar === "Backspace" ? (
                <TbBackspaceFilled className="icon" />
              ) : null
            }
          />
        );
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
