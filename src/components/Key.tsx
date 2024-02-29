// react

// third party
import styled from "styled-components";
import { motion } from "framer-motion";
// utils

// data

// components

interface KeyProps {
  keyChar: string;
  icon?: React.ReactNode | null;
  bgColor: string | null;
  delay: number;
  xStart: number;
}

const Key: React.FC<KeyProps> = ({ keyChar, icon, bgColor, delay, xStart }) => {
  const clickHandler = () => {
    const clickOrTouchEvent = new KeyboardEvent("keydown", {
      key: keyChar,
    });
    document.dispatchEvent(clickOrTouchEvent);
  };

  return (
    <Wrapper
      as={motion.div}
      initial={{ opacity: 0, translateY: xStart }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.1, delay }}
      style={{ backgroundColor: `${bgColor ? bgColor : "#818384"}` }}
      onClick={clickHandler}
      fontSize={keyChar === "Enter" ? ".75rem" : "1.25rem"}
      width={
        keyChar === "Enter" || keyChar === "Backspace" ? "3.625rem" : "2.5rem"
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
  font-weight: 700;
  display: grid;
  background-color: #818384;
  height: 3.5rem;
  margin: 0.225rem 0.175rem;
  border-radius: 5px;

  cursor: pointer;
  line-height: 3.5rem;
  .icon {
    margin: auto;
  }
`;
