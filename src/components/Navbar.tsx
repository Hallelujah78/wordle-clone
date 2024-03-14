import { IoInformationCircleOutline } from "react-icons/io5";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaVolumeHigh } from "react-icons/fa6";
import { FaVolumeXmark } from "react-icons/fa6";

interface NavbarProps {
  show: () => void;
  windowWidth: number;
  isMuted: boolean;
  setIsMuted: (isMuted: boolean | ((prev: boolean) => boolean)) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  show,
  windowWidth,
  isMuted,
  setIsMuted,
}) => {
  return (
    <Wrapper data-testid="nav-bar">
      <div className="nav-center">
        <motion.div
          initial={{ y: -250 }}
          animate={{ y: 0 }}
          className="title lilita-one-regular"
        >
          {windowWidth < 460 ? "Wurdil DFE" : "Wurdil - Dumpster Fire Edition"}
        </motion.div>
      </div>
      <IoInformationCircleOutline
        data-testid="info-button"
        onClick={() => {
          show();
        }}
        className="info-icon"
      />
      <button
        className="mute-button"
        onClick={() => {
          setIsMuted((prev) => !prev);
        }}
      >
        {isMuted ? <FaVolumeHigh /> : <FaVolumeXmark />}
      </button>
    </Wrapper>
  );
};
export default Navbar;

const Wrapper = styled.nav`
  border-bottom: 1px solid gray;
  box-sizing: border-box;
  height: 3rem;
  position: relative;

  .nav-center {
    height: 100%;
    box-sizing: border-box;
    width: 95vw;
    margin: auto;
  }
  div.title {
    display: grid;
    place-content: center;
    height: 3rem;
    font-size: calc(1.25rem + 0.390625vw);
  }
  .info-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1rem;
    font-size: calc(1.75rem + 0.390625vw);
    cursor: pointer;
  }
  .mute-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 1rem;
    font-size: calc(1.75rem + 0.390625vw);
    cursor: pointer;
    background: transparent;
    color: white;
    border: none;
    display: grid;
    place-content: center;
  }
`;
