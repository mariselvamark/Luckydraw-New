import React from 'react';
import { Box, Button } from '@mui/material';
import styled, { keyframes } from 'styled-components';

const shimmerBtn = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

/* ─── Commit The Draw (primary) ─── */
const CommitStyled = styled(Button)`
  && {
    width: 480px;
    height: 60px;
    border-radius: 32px;
    font-size: 18px;
    font-weight: 800;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #ffffff;
    background: linear-gradient(
      135deg,
      #e53935 0%,
      #ef5350 25%,
      #ff8a80 50%,
      #ef5350 75%,
      #e53935 100%
    );
    background-size: 200% auto;
    border: none;
    cursor: pointer;
    box-shadow: 0 6px 25px rgba(229, 57, 53, 0.4), 0 2px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 35px rgba(229, 57, 53, 0.5), 0 4px 15px rgba(0, 0, 0, 0.3);
      animation: ${shimmerBtn} 2s linear infinite;
    }

    &:active {
      transform: translateY(0);
    }

    &:disabled {
      background: linear-gradient(135deg, #616161, #757575, #9e9e9e, #757575, #616161);
      box-shadow: none;
      cursor: not-allowed;
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;

/* ─── Publish button (green/gold) ─── */
const PublishStyled = styled(Button)`
  && {
    flex: 1;
    height: 58px;
    border-radius: 32px;
    font-size: 17px;
    font-weight: 800;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #ffffff;
    background: linear-gradient(
      135deg,
      #2e7d32 0%,
      #43a047 25%,
      #66bb6a 50%,
      #43a047 75%,
      #2e7d32 100%
    );
    background-size: 200% auto;
    border: none;
    cursor: pointer;
    box-shadow: 0 6px 25px rgba(46, 125, 50, 0.4), 0 2px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 35px rgba(46, 125, 50, 0.5), 0 4px 15px rgba(0, 0, 0, 0.3);
      animation: ${shimmerBtn} 2s linear infinite;
    }

    &:active {
      transform: translateY(0);
    }
  }
`;

/* ─── Re Draw button (same red as Commit) ─── */
const ReDrawStyled = styled(Button)`
  && {
    flex: 1;
    height: 58px;
    border-radius: 32px;
    font-size: 17px;
    font-weight: 800;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #ffffff;
    background: linear-gradient(
      135deg,
      #e53935 0%,
      #ef5350 25%,
      #ff8a80 50%,
      #ef5350 75%,
      #e53935 100%
    );
    background-size: 200% auto;
    border: none;
    cursor: pointer;
    box-shadow: 0 6px 25px rgba(229, 57, 53, 0.4), 0 2px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 35px rgba(229, 57, 53, 0.5), 0 4px 15px rgba(0, 0, 0, 0.3);
      animation: ${shimmerBtn} 2s linear infinite;
    }

    &:active {
      transform: translateY(0);
    }
  }
`;

const ButtonRow = styled(Box)`
  display: flex;
  gap: 16px;
  width: 480px;
`;

/* ─── Props ─── */
interface CommitButtonProps {
  onClick: () => void;
  disabled: boolean;
  isDrawing: boolean;
}

interface ActionButtonsProps {
  onPublish: () => void;
  onReDraw: () => void;
}

export const CommitButton: React.FC<CommitButtonProps> = ({ onClick, disabled, isDrawing }) => {
  return (
    <CommitStyled onClick={onClick} disabled={disabled || isDrawing}>
      {isDrawing ? 'Drawing...' : disabled ? 'All Rounds Complete' : 'Commit The Draw'}
    </CommitStyled>
  );
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onPublish, onReDraw }) => {
  return (
    <ButtonRow>
      <ReDrawStyled onClick={onReDraw}>Re Draw</ReDrawStyled>
      <PublishStyled onClick={onPublish}>Publish</PublishStyled>
    </ButtonRow>
  );
};

export default CommitButton;
