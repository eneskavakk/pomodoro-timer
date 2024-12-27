import React, { useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import ControlButton from "./ControlButton";

interface SettingsProps {
  workTime: number;
  breakTime: number;
  onSettingsChange: (newWorkTime: number, newBreakTime: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translate(-50%, -40%); opacity: 0; }
  to { transform: translate(-50%, -50%); opacity: 1; }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.3s ease-out;
  z-index: 1000;
`;

const SettingsContainer = styled.div`
  background: ${(props) => props.theme.surface};
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px ${(props) => props.theme.shadow};
  min-width: 320px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${slideIn} 0.3s ease-out;
  z-index: 1001;

  @media (max-width: 480px) {
    min-width: 280px;
    padding: 1.5rem;
    width: 90%;
  }
`;

const Title = styled.h2`
  color: ${(props) => props.theme.text};
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: ${(props) => props.theme.primary};
    border-radius: 2px;
  }
`;

const InputGroup = styled.div`
  margin: 1.2rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: ${(props) => props.theme.text};
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 2px solid ${(props) => props.theme.shadow};
  border-radius: 12px;
  font-size: 1rem;
  width: 120px;
  transition: all 0.3s ease;
  background: ${(props) => props.theme.surface};
  color: ${(props) => props.theme.text};

  &:focus {
    border-color: ${(props) => props.theme.primary};
    outline: none;
    box-shadow: 0 0 0 3px ${(props) => props.theme.shadow};
  }

  &:hover {
    border-color: ${(props) => props.theme.primary};
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1;
    height: 24px;
  }
`;

const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ButtonContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Settings: React.FC<SettingsProps> = ({
  workTime,
  breakTime,
  onSettingsChange,
  isOpen,
  onClose,
}) => {
  const [workTimeInput, setWorkTimeInput] = useState(workTime);
  const [breakTimeInput, setBreakTimeInput] = useState(breakTime);
  const [error, setError] = useState("");

  const validateInput = useCallback((value: number) => {
    if (value <= 0) return "Time must be greater than 0";
    if (value > 120) return "Time cannot exceed 120 minutes";
    return "";
  }, []);

  const handleWorkTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value);
      setWorkTimeInput(value);
      setError(validateInput(value));
    },
    [validateInput]
  );

  const handleBreakTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value);
      setBreakTimeInput(value);
      setError(validateInput(value));
    },
    [validateInput]
  );

  const applySettings = useCallback(() => {
    const workError = validateInput(workTimeInput);
    const breakError = validateInput(breakTimeInput);

    if (workError || breakError) {
      setError(workError || breakError);
      return;
    }

    setError("");
    onSettingsChange(workTimeInput, breakTimeInput);
    onClose();
  }, [workTimeInput, breakTimeInput, validateInput, onSettingsChange, onClose]);

  return (
    <Overlay isOpen={isOpen} onClick={onClose}>
      <SettingsContainer onClick={(e) => e.stopPropagation()}>
        <Title>Settings</Title>
        <InputGroup>
          <Label>Work Time (minutes):</Label>
          <Input
            type="number"
            min="1"
            max="120"
            value={workTimeInput}
            onChange={handleWorkTimeChange}
          />
        </InputGroup>
        <InputGroup>
          <Label>Break Time (minutes):</Label>
          <Input
            type="number"
            min="1"
            max="120"
            value={breakTimeInput}
            onChange={handleBreakTimeChange}
          />
        </InputGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonContainer>
          <ControlButton onClick={applySettings} label="Save" />
          <ControlButton onClick={onClose} label="Cancel" />
        </ButtonContainer>
      </SettingsContainer>
    </Overlay>
  );
};

export default Settings;
