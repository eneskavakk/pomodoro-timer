import React from "react";
import styled from "styled-components";

interface ControlButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
}

const StyledButton = styled.button`
  background: ${(props) => props.theme.surface};
  color: ${(props) => props.theme.text};
  border: 2px solid ${(props) => props.theme.primary};
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: ${(props) => props.theme.primary};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px ${(props) => props.theme.shadow};
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px ${(props) => props.theme.shadow};
  }

  @media (max-width: 480px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const ControlButton: React.FC<ControlButtonProps> = ({
  onClick,
  label,
  className,
}) => {
  return (
    <StyledButton onClick={onClick} className={className}>
      {label}
    </StyledButton>
  );
};

export default ControlButton;
