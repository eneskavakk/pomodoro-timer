import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Timer from "./components/Timer";
import Settings from "./components/Settings";
import ControlButton from "./components/ControlButton";

const lightTheme = {
  background: "linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)",
  text: "#2c3e50",
  primary: "#4a90e2",
  secondary: "#357abd",
  surface: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
  shadow: "rgba(0, 0, 0, 0.1)",
};

const darkTheme = {
  background: "linear-gradient(135deg, #2c3e50 0%, #1a2533 100%)",
  text: "#f5f7fa",
  primary: "#4a90e2",
  secondary: "#357abd",
  surface: "linear-gradient(135deg, #34495e 0%, #2c3e50 100%)",
  shadow: "rgba(0, 0, 0, 0.3)",
};

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  transition: all 0.3s ease;
`;

const TopBar = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 1rem;
`;

const SettingsButton = styled(ControlButton)`
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: 2px solid ${(props) => props.theme.primary};
  color: ${(props) => props.theme.text};
  font-size: 1rem;

  &:hover {
    background: ${(props) => props.theme.primary}20;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ThemeButton = styled(ControlButton)`
  padding: 0.6rem;
  min-width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: transparent;
  border: 2px solid ${(props) => props.theme.primary};
  color: ${(props) => props.theme.text};
  font-size: 1.2rem;

  &:hover {
    background: ${(props) => props.theme.primary}20;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

function App() {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [currentTime, setCurrentTime] = useState(workTime * 60);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSettingsChange = (newWorkTime: number, newBreakTime: number) => {
    setWorkTime(newWorkTime);
    setBreakTime(newBreakTime);
    setCurrentTime(newWorkTime * 60);
  };

  const handlePomodoroComplete = () => {
    setPomodoroCount((prev) => prev + 1);
  };

  const resetPomodoroCount = () => {
    setPomodoroCount(0);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <AppContainer>
        <TopBar>
          <ThemeButton
            onClick={() => setIsDarkMode((prev) => !prev)}
            label={isDarkMode ? "☀️" : "🌙"}
          />
          <SettingsButton
            onClick={() => setIsSettingsOpen(true)}
            label="⚙️ Settings"
          />
        </TopBar>
        <Timer
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          workTime={workTime}
          breakTime={breakTime}
          pomodoroCount={pomodoroCount}
          onPomodoroComplete={handlePomodoroComplete}
          onResetPomodoro={resetPomodoroCount}
        />
        <Settings
          workTime={workTime}
          breakTime={breakTime}
          onSettingsChange={handleSettingsChange}
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
