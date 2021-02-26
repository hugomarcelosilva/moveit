import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChallengeContext } from "./ChallengeContext";

type CountdownContextData = {
  hasFinished: boolean;
  isActive: boolean;
  minutes: number;
  seconds: number;
  resetCountDown: () => void;
  startCountdown: () => void;
};

type CountdownProviderProps = {
  children: ReactNode;
};

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengeContext);

  const startTime = 25 * 60;

  const [time, setTime] = useState(startTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountDown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(startTime);
    setHasFinished(false);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        hasFinished,
        isActive,
        minutes,
        seconds,
        resetCountDown,
        startCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
