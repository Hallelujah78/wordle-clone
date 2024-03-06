import styled from "styled-components";
import { motion } from "framer-motion";

interface NewGameButtonProps {
  startGame: () => void;
}

const NewGameButton: React.FC<NewGameButtonProps> = ({ startGame }) => {
  return (
    <Wrapper
      as={motion.button}
      initial={{ backgroundPosition: "50% 0%" }}
      whileHover={{ backgroundPosition: "200% 0%" }}
      onClick={startGame}
    >
      New Game
    </Wrapper>
  );
};
export default NewGameButton;

const Wrapper = styled.button`
  position: absolute;
  top: 50%;
`;
