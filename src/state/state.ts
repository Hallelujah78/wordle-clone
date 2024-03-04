import { KeyType } from "../models/KeyType.model";
import { Guesses } from "../models/Guesses.model";

export const initialKeyboardState: KeyType[] = [
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

export const initialGuessState: Guesses = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const initialGuessCompletionState = [
  false,
  false,
  false,
  false,
  false,
  false,
];
