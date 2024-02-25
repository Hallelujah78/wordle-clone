import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { getRandomArbitrary } from "./utils/utils";
import { words } from "./data/data.ts";

type WurdilGuess = [string, string, string, string, string];
type Guesses = [
  WurdilGuess,
  WurdilGuess,
  WurdilGuess,
  WurdilGuess,
  WurdilGuess,
  WurdilGuess
];

const initialGuessState: Guesses = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

const App: React.FC = () => {
  const [guesses, setGuesses] = useState<Guesses>(initialGuessState);
  const [currentGuessIndex, _setCurrentGuessIndex] = useState<number>(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");

  const enterKeyHandler = useCallback(() => {
    // is guess a valid word?
    // then
  }, []);

  const deleteKeyHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Backspace" && currentLetterIndex > 0) {
        if (
          guesses[currentGuessIndex][currentLetterIndex].length === 1 &&
          currentLetterIndex === 4
        ) {
          setGuesses((prev) => {
            const newState = JSON.parse(JSON.stringify(prev));
            newState[currentGuessIndex][currentLetterIndex] = "";
            return newState;
          });
        } else {
          setGuesses((prev) => {
            const newState = JSON.parse(JSON.stringify(prev));
            newState[currentGuessIndex][currentLetterIndex - 1] = "";
            return newState;
          });
          setCurrentLetterIndex((prev) => prev - 1);
        }
      }
    },
    [currentGuessIndex, currentLetterIndex, guesses]
  );

  const alphaKeypressHandler = useCallback(
    (event: KeyboardEvent) => {
      const keyRegex = new RegExp(/[a-z]/i);
      if (
        guesses[currentGuessIndex][currentLetterIndex].length === 0 &&
        event.key.length === 1 &&
        keyRegex.test(event.key)
      ) {
        setGuesses((prev) => {
          const newState = JSON.parse(JSON.stringify(prev));
          newState[currentGuessIndex][currentLetterIndex] =
            event.key.toUpperCase();
          return newState;
        });
        setCurrentLetterIndex((prev) => {
          if (prev < 4) {
            prev = prev + 1;
          }
          return prev;
        });
      }
    },
    [currentGuessIndex, currentLetterIndex, guesses]
  );

  const startGame = () => {
    setGuesses(initialGuessState);
    _setCurrentGuessIndex(0);
    setCurrentLetterIndex(0);
    setAnswer(words[getRandomArbitrary(0, words.length - 1)]);
  };

  useEffect(() => {
    document.addEventListener("keydown", alphaKeypressHandler);
    document.addEventListener("keydown", deleteKeyHandler);
    document.addEventListener("keydown", enterKeyHandler);

    return () => {
      document.removeEventListener("keydown", alphaKeypressHandler);
      document.removeEventListener("keydown", deleteKeyHandler);
      document.removeEventListener("keydown", enterKeyHandler);
    };
  }, [alphaKeypressHandler, deleteKeyHandler, enterKeyHandler]);

  return (
    <Wrapper>
      <nav>
        <h1>Wurdil Wedstriid</h1>
        <button onClick={startGame}>New Game</button>
      </nav>
      <section>
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
        <div id="guess-1">
          <div className="letter" id="0"></div>
          <div className="letter" id="1"></div>
          <div className="letter" id="2"></div>
          <div className="letter" id="3"></div>
          <div className="letter" id="4"></div>
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
    height: calc(100vh - 3rem);
    display: grid;
    place-content: center;
    max-width: 100%;
  }
  h3 {
    position: absolute;
    bottom: 5%;
    left: 48vw;
  }
  #guess-0 {
    display: inline-block;
    height: auto;
  }
  .letter {
    display: inline-block;
    font-size: 3rem;
    height: 3rem;
    width: 3rem;
    border: 1px solid gray;
    text-align: center;
    vertical-align: top;
    margin: 0.5rem;
  }
`;
