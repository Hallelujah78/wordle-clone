import styled from "styled-components";
import { motion } from "framer-motion";

interface ButtonProps {
  clickHandler: () => void;
  buttonText: string;
  className: string;
}

const Button: React.FC<ButtonProps> = ({
  clickHandler,
  buttonText,
  className,
}) => {
  return (
    <Wrapper
      className={className}
      as={motion.button}
      initial={{ backgroundPosition: "50% 0%" }}
      whileHover={{ backgroundPosition: "200% 0%" }}
      onClick={clickHandler}
    >
      {buttonText}
    </Wrapper>
  );
};
export default Button;

const Wrapper = styled.button`
  background: linear-gradient(
    100deg,
    rgba(255, 121, 4, 1) 88%,
    rgba(218, 213, 201, 1) 90%,
    rgba(255, 121, 4, 1) 92%
  );
  min-width: 7rem;
  background-size: 200% 200%;
  transition: 0.5s;
  position: absolute;
  bottom: 20%;
  left: 30%;
  transform: translateX(-50%);
  font-size: calc(1rem + 0.390625vw);
  padding: 0.4rem 0.7rem;
  border-radius: 1rem;
  border: none;
  color: white;
  cursor: pointer;
  &:active,
  &:hover {
    box-shadow: 0 0 20px #eee;
  }
`;
