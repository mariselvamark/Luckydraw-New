import React from 'react';
import { Box, Typography } from '@mui/material';
import styled, { keyframes } from 'styled-components';

const countPulse = keyframes`
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.03); }
`;

const TopBarContainer = styled(Box)`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 40px;
  position: relative;
  z-index: 10;
`;

const LogoLeft = styled(Box)`
  width: 170px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 8px 16px;
`;

const LogoImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const CheckInBadge = styled(Box)`
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 10px 40px 14px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
`;

const CheckInLabel = styled(Typography)`
  && {
    color: #ffffff;
    font-size: 16px;
    font-weight: 800;
    letter-spacing: 4px;
    text-transform: uppercase;
  }
`;

const CheckInCount = styled(Typography)`
  && {
    color: #ffffff;
    font-size: 52px;
    font-weight: 900;
    line-height: 1;
    letter-spacing: 2px;
    animation: ${countPulse} 3s ease-in-out infinite;
    text-shadow: 0 2px 10px rgba(255, 255, 255, 0.15);
  }
`;

const LogoRight = styled(Box)`
  width: 170px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 8px 16px;
`;

interface TopBarProps {
  checkedInCount: number;
}

const TopBar: React.FC<TopBarProps> = ({ checkedInCount }) => {
  return (
    <TopBarContainer>
      <LogoLeft>
        <LogoImage src="/niralya-logo.png" alt="Niralya" />
      </LogoLeft>

      <CheckInBadge>
        <CheckInLabel>Checked In</CheckInLabel>
        <CheckInCount>{checkedInCount.toLocaleString()}</CheckInCount>
      </CheckInBadge>

      <LogoRight>
        <LogoImage src="/Stutzee-logo4.svg" alt="Stutzee" />
      </LogoRight>
    </TopBarContainer>
  );
};

export default TopBar;
