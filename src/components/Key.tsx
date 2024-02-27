// react

// third party
import styled from "styled-components";

// utils

// data

// components

interface KeyProps {
  keyChar: string;
}

const Key: React.FC<KeyProps> = ({ keyChar }) => {
  const clickHandler = () => {
    const clickOrTouchEvent = new KeyboardEvent("keydown", {
      key: keyChar,
    });
    document.dispatchEvent(clickOrTouchEvent);
  };

  return (
    <Wrapper
      onClick={clickHandler}
      fontSize={
        keyChar === "Enter" || keyChar === "Backspace" ? ".75rem" : "2rem"
      }
      width={
        keyChar === "Enter" || keyChar === "Backspace" ? "3.25rem" : "2rem"
      }
    >
      {keyChar.toUpperCase()}
    </Wrapper>
  );
};
export default Key;

interface KeyDivProps {
  fontSize: string;
  width: string;
}

const Wrapper = styled.div.attrs<KeyDivProps>((props) => ({
  style: {
    fontSize: `${props.fontSize}`,
    width: `${props.width}`,
  },
}))<KeyDivProps>`
  background-color: gray;
  height: 2.5rem;
  margin: 0.25rem;
  border-radius: 5px;
  cursor: pointer;
  justify-content: center;
  line-height: 2.5rem;
`;
