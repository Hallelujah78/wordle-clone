// react
import { useState, useEffect, useCallback } from "react";

// third party
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// utils
import { getRandomArbitrary } from "./utils/utils";

// data
import { words } from "./data/data.ts";

// components
import Keyboard from "./components/Keyboard.tsx";

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
  const [currentGuessIndex, setCurrentGuessIndex] = useState<number>(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const enterKeyHandler = useCallback(
    (event: KeyboardEvent) => {
      const guess = guesses[currentGuessIndex].join("");

      if (event.key === "Enter") {
        // is correct answer
        if (guess === answer && !isGameOver) {
          ///***Logic to set background colors of hidden "back" tile
          ///***Trigger the animation to flip tiles***
          ///***Indicate which tiles are in correct position***
          setCurrentGuessIndex((prev) => (prev < 5 ? prev + 1 : prev));
          setIsGameOver(true);
          toast("congrats you won!");
        } else if (!words.includes(guess)) {
          toast("not a valid answer!");
        }
        // guess must be valid word but incorrect
        else if (currentGuessIndex === 5) {
          // that was your last guess
          setIsGameOver(true);
          toast(
            `bad luck, you lose! The correct answer was ${answer.toUpperCase()}`
          );
        } else {
          // you have more guesses left
          toast("bad luck!");
          setCurrentGuessIndex((prev) => prev + 1);
          setCurrentLetterIndex(0);
        }

        // do letters in the guess appear in the answer?
        //  - is letter in correct place: true/false
      }
    },
    [currentGuessIndex, answer, guesses, isGameOver]
  );

  const deleteKeyHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Backspace" && currentLetterIndex > 0) {
        if (guesses[currentGuessIndex][currentLetterIndex].length === 1) {
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
          newState[currentGuessIndex][currentLetterIndex] = event.key;
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
    setCurrentGuessIndex(0);
    setCurrentLetterIndex(0);
    setIsGameOver(false);
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
    <>
      <ToastContainer />
      <Wrapper>
        <nav>
          <h1>Wurdil Wedstriid</h1>
          <button onClick={startGame}>New Game</button>
        </nav>
        <section>
          <div className="guess-container">
            <div className="guess" id="guess-0">
              <div className="letter" id="0">
                {guesses[0][0].toUpperCase()}
              </div>
              <div className="letter" id="1">
                {guesses[0][1].toUpperCase()}
              </div>
              <div className="letter" id="2">
                {guesses[0][2].toUpperCase()}
              </div>
              <div className="letter" id="3">
                {guesses[0][3].toUpperCase()}
              </div>
              <div className="letter" id="4">
                {guesses[0][4].toUpperCase()}
              </div>
            </div>
            <div className="guess" id="guess-1">
              <div className="letter" id="0">
                {guesses[1][0].toUpperCase()}
              </div>
              <div className="letter" id="1">
                {guesses[1][1].toUpperCase()}
              </div>
              <div className="letter" id="2">
                {guesses[1][2].toUpperCase()}
              </div>
              <div className="letter" id="3">
                {guesses[1][3].toUpperCase()}
              </div>
              <div className="letter" id="4">
                {guesses[1][4].toUpperCase()}
              </div>
            </div>
            <div className="guess" id="guess-2">
              <div className="letter" id="0">
                {guesses[2][0].toUpperCase()}
              </div>
              <div className="letter" id="1">
                {guesses[2][1].toUpperCase()}
              </div>
              <div className="letter" id="2">
                {guesses[2][2].toUpperCase()}
              </div>
              <div className="letter" id="3">
                {guesses[2][3].toUpperCase()}
              </div>
              <div className="letter" id="4">
                {guesses[2][4].toUpperCase()}
              </div>
            </div>
            <div className="guess" id="guess-3">
              <div className="letter" id="0">
                {guesses[3][0].toUpperCase()}
              </div>
              <div className="letter" id="1">
                {guesses[3][1].toUpperCase()}
              </div>
              <div className="letter" id="2">
                {guesses[3][2].toUpperCase()}
              </div>
              <div className="letter" id="3">
                {guesses[3][3].toUpperCase()}
              </div>
              <div className="letter" id="4">
                {guesses[3][4].toUpperCase()}
              </div>
            </div>
            <div className="guess" id="guess-4">
              <div className="letter" id="0">
                {guesses[4][0].toUpperCase()}
              </div>
              <div className="letter" id="1">
                {guesses[4][1].toUpperCase()}
              </div>
              <div className="letter" id="2">
                {guesses[4][2].toUpperCase()}
              </div>
              <div className="letter" id="3">
                {guesses[4][3].toUpperCase()}
              </div>
              <div className="letter" id="4">
                {guesses[4][4].toUpperCase()}
              </div>
            </div>
            <div className="guess" id="guess-5">
              <div className="letter" id="0">
                {guesses[5][0].toUpperCase()}
              </div>
              <div className="letter" id="1">
                {guesses[5][1].toUpperCase()}
              </div>
              <div className="letter" id="2">
                {guesses[5][2].toUpperCase()}
              </div>
              <div className="letter" id="3">
                {guesses[5][3].toUpperCase()}
              </div>
              <div className="letter" id="4">
                {guesses[5][4].toUpperCase()}
              </div>
            </div>
          </div>
          <div className="keyboard-container">
            <Keyboard />
          </div>
        </section>

        <h3>{answer}</h3>
      </Wrapper>
    </>
  );
};

export default App;

const Wrapper = styled.div`
  height: 100vh;
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
    .guess-container {
      /* border: red solid 1px; */
    }
  }
  h3 {
    position: absolute;
    bottom: 5%;
    left: 48vw;
  }
  .guess {
    height: auto;

    display: flex;
    place-content: center;
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
