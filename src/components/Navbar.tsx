import { IoInformationCircleOutline } from "react-icons/io5";
import styled from "styled-components";
import { motion } from "framer-motion";

interface NavbarProps {
  show: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ show }) => {
  return (
    <Wrapper>
      <div className="nav-center">
        <motion.div
          initial={{ y: -250 }}
          animate={{ y: 0 }}
          className="title lilita-one-regular"
        >
          {window.innerWidth < 460
            ? "Wurdil DFE"
            : "Wurdil - Dumpster Fire Edition"}
        </motion.div>
      </div>
      <IoInformationCircleOutline
        onClick={() => {
          show();
        }}
        className="info-icon"
      />
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
`;
