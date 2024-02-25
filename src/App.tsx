import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { getRandomArbitrary } from "./utils/utils";
import { words } from "./data/data.ts";

type WurdilGuess = string[];

const App: React.FC = () => {
  const [guesses, setGuesses] = useState<
    [
      WurdilGuess,
      WurdilGuess,
      WurdilGuess,
      WurdilGuess,
      WurdilGuess,
      WurdilGuess
    ]
  >([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [currentGuessIndex, setCurrentGuessIndex] = useState<number>(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");

  const enterKeyHandler = () => {
    // is guess a valid word?
    // then
  };
  const deleteKeyHandler = () => {};
  const alphaKeypressHandler = useCallback(() => {
    // a key is pressed
    // under certain circumstances we do nothing
    // positionBlankLetter is between 0-4 inclusive and the key is a-z
    // then set value of the appropriate span to that letter and increment positionBlankLetter
    console.log(currentLetterIndex);
    console.log(guesses[0]);

    setGuesses((prev) => {
      prev[currentGuessIndex][currentLetterIndex] = "A";
      return prev;
    });
    setCurrentLetterIndex((prev) => {
      if (prev < 4) {
        prev = prev + 1;
      }
      return prev;
    });
  }, [currentGuessIndex, currentLetterIndex, guesses]);

  const startGame = () => {
    setAnswer(words[getRandomArbitrary(0, words.length - 1)]);
  };

  useEffect(() => {
    document.addEventListener("keyup", alphaKeypressHandler);

    return () => {
      document.removeEventListener("keyup", alphaKeypressHandler);
    };
  }, [alphaKeypressHandler]);

  return (
    <Wrapper>
      <nav>
        <h1>Wurdil Wedstriid</h1>
        <button onClick={startGame}>New Game</button>
      </nav>
      <section>
        <input type="text" />
        <div id="guess-0">
          <div className="letter" id="0">
            {guesses[0][0]}
          </div>
          <div className="letter" id="1">
            {guesses[0][1]}
          </div>
          <div className="letter" id="2">
            {guesses[0][2]}
          </div>
          <div className="letter" id="3">
            {guesses[0][3]}
          </div>
          <div className="letter" id="4">
            {guesses[0][4]}
          </div>
        </div>
        {/* <div id="guess-1">
          <span id="0"></span>
          <span id="1"></span>
          <span id="2"></span>
          <span id="3"></span>
          <span id="4"></span>
        </div> */}
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
  }
  h3 {
    position: absolute;
    bottom: 5%;
    left: 48vw;
  }
  guess-0 {
    border: red solid 1px;
    display: inline-block;
  }
  .letter {
    display: inline-block;
    font-size: 3rem;
    height: 3rem;
    width: 3rem;
    border: 1px solid gray;
    text-align: center;
  }
`;
