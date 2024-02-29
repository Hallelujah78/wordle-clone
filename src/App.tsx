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

// utils
import { getRandomArbitrary } from "./utils/utils";

// data
import { words } from "./data/data.ts";

// components
import Keyboard from "./components/Keyboard.tsx";
import Guess from "./components/Guess.tsx";

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
  const [answer, setAnswer] = useState<string>("");
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
    console.log(`***${answer}***`);
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
          ///***Logic to set background colors of hidden "back" tile
          ///***Trigger the animation to flip tiles***
          ///***Indicate which tiles are in correct position***
          newIsGuessComplete[currentGuessIndex] = true;
          setIsGuessComplete(newIsGuessComplete);
          setCurrentGuessIndex((prev) => (prev < 5 ? prev + 1 : prev));
          setIsGameOver(true);
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
          toast(`Bad luck! The correct answer was ${answer.toUpperCase()}`);
        } else {
          // you have more guesses left

          newIsGuessComplete[currentGuessIndex] = true;
          setIsGuessComplete(newIsGuessComplete);
          updateKeyboard();
          setCurrentGuessIndex((prev) => prev + 1);
          setCurrentLetterIndex(0);
        }

        // do letters in the guess appear in the answer?
        //  - is letter in correct place: true/false
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
          <h1>Wurdil Wedstriid</h1>
          <button onClick={startGame}>New Game</button>
        </nav>
        <section>
          <div className="guess-container">
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
          </div>
          <div className="keyboard-container">
            <Keyboard keyboardState={keyboardState} />
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
