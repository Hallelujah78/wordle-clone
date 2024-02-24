import { useState, useEffect } from "react";
import styled from "styled-components";
import { getRandomArbitrary } from "./utils/utils";
import { words } from "./data/data.ts";

type WurdilGuess = [string, string, string, string, string];

const App: React.FC = () => {
  const [currentGuessNumber, setCurrentGuessNumber] = useState(1);
  const [positionBlankLetter, setPositionBlankLetter] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");
  const [currentGuessValue, setCurrentGuessValue] = useState<WurdilGuess>([
    "",
    "",
    "",
    "",
    "",
  ]);

  const enterKeyHandler = () => {};
  const deleteKeyHandler = () => {};
  const alphaKeyPressHandler = () => {
    const currentGuessNumberDOM = Array.from(document.querySelectorAll(
      `guess-${currentGuessNumber}`)
    const positionBlankLetterDOM = currentGuessNumberDOM.find((span)=>{
      +span.id === positionBlankLetter;
    })
    );
    // a key is pressed
    // under certain circumstances we do nothing
    // positionBlankLetter is between 0-4 inclusive and the key is a-z
    // then set value of the appropriate span to that letter and increment positionBlankLetter
    setCurrentGuessValue((prev) => [...prev], "a");
  };

  const startGame = () => {
    setAnswer(words[getRandomArbitrary(0, words.length - 1)]);
  };

  useEffect(() => {
    document.addEventListener("keyup", alphaKeyPressHandler);

    return () => {
      document.removeEventListener("keyup", alphaKeyPressHandler);
    };
  }, []);

  return (
    <Wrapper>
      <nav>
        <h1>Wurdil Wedstriid</h1>
        <button onClick={startGame}>New Game</button>
      </nav>
      <section>
        <input type="text" />
        <div id="guess-1">
          <span id="0"></span>
          <span id="1"></span>
          <span id="2"></span>
          <span id="3"></span>
          <span id="4"></span>
        </div>
      </section>
      <h3>{answer}</h3>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  height: 100vh;
  position: relative;
  nav {
    border-bottom: 1px solid gray;
    text-align: center;
    height: 3rem;
  }
  h1 {
    margin: auto;

    height: 100%;
    font-size: 3rem;
  }
  section {
    display: grid;
    place-content: center;
    max-width: 100%;

    input {
      height: 3rem;
      text-align: center;
      font-size: 3rem;
      margin: 1.25rem 0 1.25rem 0;
      caret-color: transparent;
    }
  }
  h3 {
    position: absolute;
    bottom: 5%;
    left: 48vw;
  }
`;
