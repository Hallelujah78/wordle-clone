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

// state
import { initialKeyboardState } from "./state/state.ts";
import { initialGuessState } from "./state/state.ts";
import { initialGuessCompletionState } from "./state/state.ts";

// models
import { KeyType } from "./models/KeyType.model.ts";

const App: React.FC = () => {
  const [guesses, setGuesses] = useState(initialGuessState);
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [answer, setAnswer] = useState<string>(() => {
    return words[getRandomArbitrary(0, words.length - 1)];
  });
  const [isGameOver, setIsGameOver] = useState(true);
  const [keyboardState, setKeyboardState] = useState(initialKeyboardState);
  const [isGuessComplete, setIsGuessComplete] = useState(
    initialGuessCompletionState
  );
  const [isWin, setIsWin] = useState(false);
  const [isPortrait, setIsPortrait] = useState<boolean>(() => {
    return window.matchMedia("(orientation: portrait)").matches;
  });

  const getOrientationAndHeight = (event: MediaQueryListEvent) => {
    alert(event.matches);
    setIsPortrait(event.matches);
  };

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
          setIsWin(true);
          toast("congrats you won!");
        } else if (!words.includes(guess)) {
          toast("not a valid answer!");
        }
        // guess must be valid word but incorrect
        else if (currentGuessIndex === 5) {
          newIsGuessComplete[currentGuessIndex] = true;
          setIsGuessComplete(newIsGuessComplete);
          updateKeyboard();
          // that was your last guess
          setIsGameOver(true);
          setIsWin(false);
          toast(`The Answer Was ${answer.toUpperCase()}`);
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
    setIsWin(false);
    setAnswer(words[getRandomArbitrary(0, words.length - 1)]);
  };

  useEffect(() => {
    document.addEventListener("keydown", alphaKeypressHandler);
    document.addEventListener("keydown", deleteKeyHandler);
    document.addEventListener("keydown", enterKeyHandler);
    window
      .matchMedia("(orientation: portrait)")
      .addEventListener("change", getOrientationAndHeight);

    return () => {
      document.removeEventListener("keydown", alphaKeypressHandler);
      document.removeEventListener("keydown", deleteKeyHandler);
      document.removeEventListener("keydown", enterKeyHandler);
      window
        .matchMedia("(orientation: portrait)")
        .removeEventListener("change", getOrientationAndHeight);
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
        {isGameOver && (
          <GameOver
            isPortrait={isPortrait}
            startGame={startGame}
            isGameOver={isGameOver}
            isWin={isWin}
          />
        )}
      </Wrapper>
      <div>{answer}</div>
    </>
  );
};

export default App;

const Wrapper = styled.div`
  display: grid;
  position: relative;
  user-select: none;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  nav {
    border-bottom: 1px solid gray;
    box-sizing: border-box;
    height: 3rem;
  }
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

  section {
    height: calc(100vh - 3rem);
    display: grid;
    max-width: 100%;
    align-content: start;
  }

  .guess-container {
    width: 85vw;

    display: grid;
    place-content: center;
    margin: auto;
    margin-top: 1.5rem;
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
    top: 15vh;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    width: fit-content;
    background: white;
    color: black;
    font-size: calc(1.25rem + 0.390625vw);
  }
`;
