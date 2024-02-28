// react
import { useState, useEffect, useCallback } from "react";

// third party
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "./styles/GlobalStyles.ts";
import { Reset } from "styled-reset";

// utils
import { getRandomArbitrary } from "./utils/utils";

// data
import { words } from "./data/data.ts";

// components
import Keyboard from "./components/Keyboard.tsx";
import Guess from "./components/Guess.tsx";

export type WurdilGuess = [string, string, string, string, string];
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

      if (event.key === "Enter" && !isGameOver) {
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
      if (isGameOver) {
        return;
      }
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
    [currentGuessIndex, currentLetterIndex, guesses, isGameOver]
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
      <GlobalStyle />
      <Reset />
      <ToastContainer />

      <Wrapper>
        <nav>
          <h1>Wurdil Wedstriid</h1>
          <button onClick={startGame}>New Game</button>
        </nav>
        <section>
          <div className="guess-container">
            {guesses.map((guess, index) => {
              return <Guess key={index} guess={guess} />;
            })}
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
  user-select: none;
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
  }
  h3 {
    position: absolute;
    bottom: 5%;
    left: 48vw;
    color: white;
  }
  .guess-container {
    margin: auto;
  }
`;
