// react

// third party
import styled from "styled-components";
import { motion } from "framer-motion";
import { KeyType } from "../models/KeyType.model";
// utils

// data

// components

interface KeyProps {
  keyChar: KeyType;
  icon?: React.ReactNode | null;
  bgColor: string | null;
  delay: number;
  xStart: number;
}

const Key: React.FC<KeyProps> = ({ keyChar, icon, bgColor, delay, xStart }) => {
  const clickHandler = () => {
    const clickOrTouchEvent = new KeyboardEvent("keydown", {
      key: keyChar.key,
    });
    document.dispatchEvent(clickOrTouchEvent);
  };

  return (
    <Wrapper
      data-testid="key"
      as={motion.div}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, translateY: xStart }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        opacity: { duration: 0.1, delay },
        translateY: { duration: 0.2, delay },
        scale: { duration: 0 },
      }}
      style={{ backgroundColor: `${bgColor ? bgColor : "#818384"}` }}
      onClick={clickHandler}
      fontSize={keyChar.key === "Enter" ? ".75rem" : "1.25rem"}
      width={
        keyChar.key === "Enter" || keyChar.key === "Backspace"
          ? "3.225rem"
          : "2rem"
      }
    >
      {icon ? icon : keyChar.key.toUpperCase()}
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
  height: 3.75rem;
  margin: 0.225rem 0.225rem;
  border-radius: 5px;

  cursor: pointer;
  line-height: 3.5rem;
  .icon {
    margin: auto;
  }
`;
