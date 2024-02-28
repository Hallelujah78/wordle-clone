// react

// third party
import styled from "styled-components";

// utils

// data

// components

interface KeyProps {
  keyChar: string;
  icon?: React.ReactNode | null;
  bgColor: string | null;
}

const Key: React.FC<KeyProps> = ({ keyChar, icon, bgColor }) => {
  const clickHandler = () => {
    const clickOrTouchEvent = new KeyboardEvent("keydown", {
      key: keyChar,
    });
    document.dispatchEvent(clickOrTouchEvent);
  };

  return (
    <Wrapper
      style={{ backgroundColor: `${bgColor ? bgColor : "#818384"}` }}
      onClick={clickHandler}
      fontSize={keyChar === "Enter" ? ".75rem" : "1.5rem"}
      width={
        keyChar === "Enter" || keyChar === "Backspace" ? "3.625rem" : "2.25rem"
      }
    >
      {icon ? icon : keyChar.toUpperCase()}
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
  display: grid;
  background-color: #818384;
  height: 2.5rem;
  margin: 0.25rem;
  border-radius: 5px;

  cursor: pointer;
  line-height: 2.5rem;
  .icon {
    margin: auto;
  }
`;
