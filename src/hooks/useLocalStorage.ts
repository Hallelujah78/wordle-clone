import {
  useCallback,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  useLayoutEffect,
} from "react";

const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] => {
  if (!key) {
    throw new Error("useLocalStorage key may not be falsy");
  }

  // initialize
  const initialize = useRef((key: string) => {
    console.log("calling initialize");
    try {
      const storeItem = localStorage.getItem(key);
      if (storeItem !== null) {
        return JSON.parse(storeItem);
      } else {
        localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // state
  const [state, setState] = useState<T>(() => {
    return initialize.current(key);
  });

  useLayoutEffect(() => setState(initialize.current(key)), [key]);

  // set
  const set: Dispatch<SetStateAction<T>> = useCallback(
    (valOrFunc) => {
      if (typeof valOrFunc === "function") {
        // set storage and state
        setState((valOrFunc as (val: T) => T)(state));
        localStorage.setItem(
          key,
          JSON.stringify((valOrFunc as (val: T) => T)(state))
        );
        //
      } else {
        localStorage.setItem(key, JSON.stringify(valOrFunc));
        setState(valOrFunc);
      }
    },
    [key, state]
  );

  return [state, set];
};

export default useLocalStorage;
