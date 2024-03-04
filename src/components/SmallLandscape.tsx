import styled from "styled-components";

const SmallLandscape = () => {
  return (
    <Wrapper>
      <div className="center">
        <h1>
          Not enough room to display content - please rotate your device or
          resize your screen!
        </h1>
      </div>
    </Wrapper>
  );
};
export default SmallLandscape;

const Wrapper = styled.div`
  z-index: 999;
  display: grid;
  place-content: center;
  background-color: black;
  position: absolute;
  max-height: 100vh;
  height: 100vh;
  width: 100%;
  max-width: 100%;
  .center {
    width: 50vw;
    height: 80vh;
    display: grid;
    place-content: center;
    h1 {
      text-align: center;
      font-size: calc(1.25rem + 0.390625vw);
    }
  }
`;
