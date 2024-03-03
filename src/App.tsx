// react
import { useState, useEffect, useCallback } from "react";

// styles
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "./styles/GlobalStyles.ts";
import { Reset } from "styled-reset";
import "./styles/styles.css";

// third party
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import { motion } from "framer-motion";

// utils
import { getRandomArbitrary } from "./utils/utils";

// data
import { words } from "./data/data.ts";

// components
import Keyboard from "./components/Keyboard.tsx";
import Guess from "./components/Guess.tsx";
import GameOver from "./components/GameOver.tsx";

export type GuessType = [string, string, string, string, string];
type Guesses = [
  GuessType,
  GuessType,
  GuessType,
  GuessType,
  GuessType,
  GuessType
];

export type KeyType = {
  key: string;
  color: string | null;
};

const initialKeyboardState: KeyType[] = [
  { key: "a", color: null },
  { key: "b", color: null },
  { key: "c", color: null },
  { key: "d", color: null },
  { key: "e", color: null },
  { key: "f", color: null },
  { key: "g", color: null },
  { key: "h", color: null },
  { key: "i", color: null },
  { key: "j", color: null },
  { key: "k", color: null },
  { key: "l", color: null },
  { key: "m", color: null },
  { key: "n", color: null },
  { key: "o", color: null },
  { key: "p", color: null },
  { key: "q", color: null },
  { key: "r", color: null },
  { key: "s", color: null },
  { key: "t", color: null },
  { key: "u", color: null },
  { key: "v", color: null },
  { key: "w", color: null },
  { key: "x", color: null },
  { key: "y", color: null },
  { key: "z", color: null },
  { key: "Backspace", color: null },
  { key: "Enter", color: null },
];

const initialGuessCompletionState = [false, false, false, false, false, false];

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
  const [answer, setAnswer] = useState<string>(() => {
    return words[getRandomArbitrary(0, words.length - 1)];
  });
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [keyboardState, setKeyboardState] =
    useState<KeyType[]>(initialKeyboardState);
  const [isGuessComplete, setIsGuessComplete] = useState(
    initialGuessCompletionState
  );

  const updateKeyboard = useCallback(() => {
    // guesses, answer
    const checkAns = answer.split("");
    const newKeyboardState: KeyType[] = JSON.parse(
      JSON.stringify(keyboardState)
    );

    for (let i = 0; i <= answer.length - 1; i++) {
      const keyToUpdate = newKeyboardState.find((keyObj) => {
        return keyObj.key === guesses[currentGuessIndex][i];
      })!;
      if (checkAns[i] === guesses[currentGuessIndex][i]) {
        // the letter is in the answer and in the right position
        keyToUpdate.color = "#538d4e";
      } else if (
        checkAns.includes(guesses[currentGuessIndex][i]) &&
        keyToUpdate.color !== "#538d4e"
      ) {
        keyToUpdate.color = "#b59f3b";
      } else if (!keyToUpdate.color) {
        keyToUpdate.color = "#3a3a3c";
      }
    }
    setKeyboardState(newKeyboardState);
  }, [answer, guesses, currentGuessIndex, keyboardState, setKeyboardState]);

  const enterKeyHandler = useCallback(
    (event: KeyboardEvent) => {
      const guess = guesses[currentGuessIndex].join("");
      const newIsGuessComplete = [...isGuessComplete];

      if (event.key === "Enter" && !isGameOver) {
        // is correct answer
        if (guess === answer && !isGameOver) {
          // change keyboard colors
          updateKeyboard();

          newIsGuessComplete[currentGuessIndex] = true;
          setIsGuessComplete(newIsGuessComplete);
          setCurrentGuessIndex((prev) => (prev < 5 ? prev + 1 : prev));
          setIsGameOver(true);
          toast("congrats you won!");
        } else if (!words.includes(guess)) {
          toast("not a valid answer!", {
            position: "bottom-center",
          });
        }
        // guess must be valid word but incorrect
        else if (currentGuessIndex === 5) {
          newIsGuessComplete[currentGuessIndex] = true;
          setIsGuessComplete(newIsGuessComplete);
          updateKeyboard();
          // that was your last guess
          setIsGameOver(true);
          toast(`Bad luck! The correct answer was ${answer.toUpperCase()}`);
        } else {
          newIsGuessComplete[currentGuessIndex] = true;
          setIsGuessComplete(newIsGuessComplete);
          updateKeyboard();
          setCurrentGuessIndex((prev) => prev + 1);
          setCurrentLetterIndex(0);
        }
      }
    },
    [
      currentGuessIndex,
      answer,
      guesses,
      isGameOver,
      updateKeyboard,
      isGuessComplete,
    ]
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
          newState[currentGuessIndex][currentLetterIndex] =
            event.key.toLowerCase();
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
    setIsGuessComplete(initialGuessCompletionState);
    setKeyboardState(initialKeyboardState);
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
          <div className="nav-center">
            <div></div>

            <motion.div
              initial={{ y: -250 }}
              animate={{ y: 0 }}
              className="title lilita-one-regular"
            >
              Wurdil - Dumpster Fire Edition
            </motion.div>
          </div>
        </nav>
        <section>
          <motion.div
            initial={{ rotateX: -180 }}
            animate={{ rotateX: 0 }}
            transition={{ duration: 1.5 }}
            className="guess-container"
          >
            {guesses.map((guess, index) => {
              const isComplete = isGuessComplete[index];
              return (
                <Guess
                  isComplete={isComplete}
                  key={index}
                  guess={guess}
                  answer={answer}
                />
              );
            })}
          </motion.div>
          <div className="keyboard-container">
            <Keyboard keyboardState={keyboardState} />
          </div>
        </section>
        <motion.div
          initial={{ x: 0, y: 0, translateX: "-50%" }}
          animate={{ display: "none" }}
          transition={{ delay: 2, duration: 0.8 }}
          className="start-game"
        >
          Guess the first word!
        </motion.div>
        {isGameOver && <GameOver startGame={startGame} />}
      </Wrapper>
    </>
  );
};

export default App;

const Wrapper = styled.div`
  position: relative;
  user-select: none;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  nav {
    border-bottom: 1px solid gray;
    box-sizing: border-box;
    height: 4rem;
  }
  .nav-center {
    height: 100%;
    display: grid;
    grid-template-columns: 0.5fr 2fr 0.5fr;
    place-content: center;
    box-sizing: border-box;
    width: 95vw;
    vertical-align: middle;
    margin: auto;
  }
  div.title {
    display: grid;
    text-align: center;
    place-content: center;
    height: 4rem;
    font-size: calc(1.25rem + 0.390625vw);
  }

  section {
    height: calc(100vh - 4rem);
    display: grid;
    place-content: center;
    max-width: 100%;
  }

  .guess-container {
    margin: auto;
  }
  .button-container {
    display: flex;

    align-items: center;
    justify-content: right;
    button {
      border-radius: 0.75rem;
      padding: 0.5rem 0.8rem;
      width: fit-content;
      height: fit-content;
    }
  }
  .start-game {
    text-align: center;
    position: absolute;
    left: 50%;
    top: 35%;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    width: fit-content;
    background: white;
    color: black;
    font-size: calc(1.25rem + 0.390625vw);
  }
`;
