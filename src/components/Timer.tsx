import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import ControlButton from "./ControlButton";

interface TimerProps {
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  workTime: number;
  breakTime: number;
  pomodoroCount: number;
  onPomodoroComplete: () => void;
  onResetPomodoro: () => void;
}

const TimerContainer = styled.div`
  background: ${(props) => props.theme.surface};
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px ${(props) => props.theme.shadow};
  text-align: center;
  min-width: 320px;
  position: relative;

  @media (max-width: 480px) {
    min-width: 280px;
    padding: 1.5rem;
  }
`;

const TimeDisplay = styled.div<{ isRunning: boolean }>`
  font-size: 5rem;
  font-weight: bold;
  color: ${(props) => props.theme.text};
  margin: 2rem 0;
  font-variant-numeric: tabular-nums;

  @media (max-width: 480px) {
    font-size: 4rem;
  }
`;

const Title = styled.h1<{ isBreak: boolean }>`
  color: ${(props) => (props.isBreak ? props.theme.primary : props.theme.text)};
  font-size: 1.8rem;
  margin: 0;
  transition: color 0.3s ease;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const PomodoroCount = styled.div`
  font-size: 1.2rem;
  color: ${(props) => props.theme.text};
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const ResetButton = styled(ControlButton)`
  padding: 0.5rem;
  min-width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.2rem;
  background: transparent;
  border: 2px solid ${(props) => props.theme.primary};
  color: ${(props) => props.theme.text};
  opacity: 0.7;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    transform: rotate(180deg);
  }
`;

const Timer: React.FC<TimerProps> = ({
  currentTime,
  setCurrentTime,
  workTime,
  breakTime,
  pomodoroCount,
  onPomodoroComplete,
  onResetPomodoro,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;

  const toggleTimer = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setIsBreak(false);
    setCurrentTime(workTime * 60);
  }, [workTime, setCurrentTime]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning && currentTime > 0) {
      interval = setInterval(() => {
        setCurrentTime((prev) => prev - 1);
      }, 1000);
    } else if (currentTime === 0) {
      if (!isBreak) {
        setCurrentTime(breakTime * 60);
        setIsBreak(true);
        onPomodoroComplete();
        if (Notification.permission === "granted") {
          new Notification("Pomodoro Timer", {
            body: "Work time is over! Time for a break.",
          });
        }
      } else {
        setCurrentTime(workTime * 60);
        setIsBreak(false);
        if (Notification.permission === "granted") {
          new Notification("Pomodoro Timer", {
            body: "Break time is over! Back to work.",
          });
        }
      }
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [
    isRunning,
    currentTime,
    workTime,
    breakTime,
    isBreak,
    setCurrentTime,
    onPomodoroComplete,
  ]);

  useEffect(() => {
    if (
      Notification.permission !== "granted" &&
      Notification.permission !== "denied"
    ) {
      Notification.requestPermission();
    }
  }, []);

  return (
    <TimerContainer>
      <Title isBreak={isBreak}>{isBreak ? "Break Time" : "Work Time"}</Title>
      <TimeDisplay isRunning={isRunning}>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </TimeDisplay>
      <PomodoroCount>
        Completed Pomodoros: {pomodoroCount}
        <ResetButton onClick={onResetPomodoro} label="↺" />
      </PomodoroCount>
      <ButtonContainer>
        <ControlButton
          onClick={toggleTimer}
          label={isRunning ? "Stop" : "Start"}
        />
        <ControlButton onClick={resetTimer} label="Reset" />
      </ButtonContainer>
    </TimerContainer>
  );
};

export default Timer;
