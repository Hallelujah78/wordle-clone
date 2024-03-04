import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

interface InformationProps {
  close: () => void;
}

const Information: React.FC<InformationProps> = ({ close }) => {
  return (
    <Wrapper>
      <div className="modal">
        <h1>information</h1>
        <FaTimes
          className="close"
          onClick={() => {
            close();
          }}
        />
      </div>
    </Wrapper>
  );
};
export default Information;

const Wrapper = styled.div`
  z-index: 100;
  height: 100vh;
  width: 100%;
  display: grid;
  place-content: center;
  .modal {
    width: 90vw;
    height: 90vh;
    border-radius: 1rem;
    background: black;
    color: white;
    position: relative;
  }
  .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: calc(1.25rem + 0.390625vw);
  }
`;
