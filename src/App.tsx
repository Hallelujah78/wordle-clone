// react
import React, { useState, useEffect, useCallback } from "react";

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
import { answers, valid } from "./data/data.ts";

// components
import Keyboard from "./components/Keyboard.tsx";
import Guess from "./components/Guess.tsx";
import GameOver from "./components/GameOver.tsx";
import SmallLandscape from "./components/SmallLandscape.tsx";
import Navbar from "./components/Navbar.tsx";
import Information from "./components/Information.tsx";

// state
import { initialKeyboardState } from "./state/state.ts";
import { initialGuessState } from "./state/state.ts";
import { initialGuessCompletionState } from "./state/state.ts";

// models
import { KeyType } from "./models/KeyType.model.ts";
import useModal from "./hooks/useModal.ts";
import Button from "./components/Button.tsx";

const App: React.FC = () => {
  const [guesses, setGuesses] = useState(initialGuessState);
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [answer, setAnswer] = useState<string>("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [keyboardState, setKeyboardState] = useState(initialKeyboardState);
  const [isGuessComplete, setIsGuessComplete] = useState(
    initialGuessCompletionState
  );
  const [isWin, setIsWin] = useState(false);
  const [isPortrait, setIsPortrait] = useState<boolean>(() => {
    return window.matchMedia("(orientation: portrait)").matches;
  });
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isGameOverVisible, setIsGameOverVisible] = useState(true);
  const { isVisible, show, close } = useModal();

  const getDeviceOrientation = (event: MediaQueryListEvent) => {
    setIsPortrait(event.matches);
  };

  const getWindowWidthHeight = () => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
  };

  const renderRotateMessage = (
    height: number,
    width: number,
    isPortrait: boolean
  ) => {
    if (
      (isPortrait && height < width) ||
      (!isPortrait && width >= 400 && height < 400) ||
      (!isPortrait && width < 400 && height < width)
    ) {
      return <SmallLandscape />;
    }
    return null;
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

      if (event.key === "Enter" && !isGameOver && !isVisible) {
        // is correct answer

        if (guess === answer && !isGameOver) {
          // change keyboard colors
          updateKeyboard();

          newIsGuessComplete[currentGuessIndex] = true;
          setIsGuessComplete(newIsGuessComplete);
          setCurrentGuessIndex((prev) => (prev < 5 ? prev + 1 : prev));
          setIsGameOver(true);
          setIsGameOverVisible(true);
          setIsWin(true);
        } else if (!valid.includes(guess)) {
          toast("not a valid answer!");
        }
        // guess must be valid word but incorrect
        else if (currentGuessIndex === 5) {
          newIsGuessComplete[currentGuessIndex] = true;
          setIsGuessComplete(newIsGuessComplete);
          updateKeyboard();
          // that was your last guess
          setIsGameOverVisible(true);
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
      isVisible,
    ]
  );

  const deleteKeyHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Backspace" && currentLetterIndex > 0 && !isVisible) {
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
    [currentGuessIndex, currentLetterIndex, guesses, isVisible]
  );

  const alphaKeypressHandler = useCallback(
    (event: KeyboardEvent) => {
      if (isGameOver || isVisible) {
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
    [currentGuessIndex, currentLetterIndex, guesses, isGameOver, isVisible]
  );

  const startGame = () => {
    setIsGuessComplete(initialGuessCompletionState);
    setKeyboardState(initialKeyboardState);
    setGuesses(initialGuessState);
    setCurrentGuessIndex(0);
    setCurrentLetterIndex(0);
    setIsGameOver(false);
    setIsWin(false);
    setAnswer(answers[getRandomArbitrary(0, answers.length - 1)]);
  };

  useEffect(() => {
    document.addEventListener("keydown", alphaKeypressHandler);
    document.addEventListener("keydown", deleteKeyHandler);
    document.addEventListener("keydown", enterKeyHandler);
    window
      .matchMedia("(orientation: portrait)")
      .addEventListener("change", getDeviceOrientation);
    window.addEventListener("resize", getWindowWidthHeight);

    return () => {
      document.removeEventListener("keydown", alphaKeypressHandler);
      document.removeEventListener("keydown", deleteKeyHandler);
      document.removeEventListener("keydown", enterKeyHandler);
      window
        .matchMedia("(orientation: portrait)")
        .removeEventListener("change", getDeviceOrientation);
      window.removeEventListener("resize", getWindowWidthHeight);
    };
  }, [alphaKeypressHandler, deleteKeyHandler, enterKeyHandler]);

  useEffect(() => {
    const randomVal = getRandomArbitrary(0, answers.length - 1);
    setAnswer(answers[randomVal]);
  }, []);

  return (
    <>
      <GlobalStyle />
      <Reset />
      <ToastContainer />

      <Wrapper>
        {isVisible && <Information isVisible={isVisible} close={close} />}
        <Navbar show={show} windowWidth={windowWidth} />
        <section>
          <motion.div
            data-testid="answer"
            initial={{ rotateX: -180 }}
            animate={{ rotateX: 0 }}
            transition={{ duration: 1.5 }}
            className={`guess-container ${answer}`}
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
            {isGameOver && !isGameOverVisible && (
              <Button
                className="new-game-app"
                clickHandler={startGame}
                buttonText="New Game"
              ></Button>
            )}
          </div>
        </section>
        {!isGameOver && (
          <motion.div
            initial={{ x: 0, y: 0, translateX: "-50%" }}
            animate={{ display: "none" }}
            transition={{ delay: 2, duration: 0.8 }}
            className="start-game"
          >
            Guess the first word!
          </motion.div>
        )}

        {isGameOver && isGameOverVisible && (
          <GameOver
            isPortrait={isPortrait}
            startGame={startGame}
            isGameOver={isGameOver}
            isWin={isWin}
            setIsGameOverVisible={setIsGameOverVisible}
          />
        )}

        {renderRotateMessage(windowHeight, windowWidth, isPortrait)}
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

  section {
    height: calc(100vh - 3rem);
    display: grid;
    max-width: 100%;
    align-content: start;
  }

  .guess-container {
    width: 85vw;
    height: auto;
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

  .keyboard-container {
    position: relative;
    .new-game-app {
      top: 44%;
      left: 50%;
    }
  }
  @media (max-height: 650px) {
    .guess-container {
      margin-top: 1vh;
    }
  }
`;
