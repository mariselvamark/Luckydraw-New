import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import styled, { keyframes, css } from 'styled-components';
import { Member } from '../data/members';

/* ─── Keyframes ─── */
const bulbGlow = keyframes`
  0%, 100% { opacity: 1; text-shadow: 0 0 8px #ffe066, 0 0 16px #ffcc00; }
  50%      { opacity: 0.6; text-shadow: 0 0 4px #ffe066; }
`;

const slideInRight = keyframes`
  0%   { transform: translateX(80px) scale(0.8); opacity: 0; }
  60%  { transform: translateX(-8px) scale(1.02); opacity: 1; }
  80%  { transform: translateX(4px) scale(0.99); }
  100% { transform: translateX(0) scale(1); opacity: 1; }
`;

const goldenGlow = keyframes`
  0%   { box-shadow: inset 0 0 0 0 rgba(255, 215, 0, 0); }
  30%  { box-shadow: inset 0 0 30px 5px rgba(255, 215, 0, 0.25), 0 0 20px rgba(255, 215, 0, 0.3); }
  100% { box-shadow: inset 0 0 0 0 rgba(255, 215, 0, 0), 0 0 0 rgba(255, 215, 0, 0); }
`;

const shimmerSweep = keyframes`
  0%   { left: -100%; }
  100% { left: 200%; }
`;

const shimmerText = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

/* ─── Panel container ─── */
const PanelContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0px;
  position: relative;
`;

/* ─── Golden corner accents ─── */
const Corner = styled(Box)<{ $pos: string }>`
  position: absolute;
  width: 20px;
  height: 20px;
  border-color: rgba(255, 215, 0, 0.35);
  border-style: solid;
  border-width: 0;
  z-index: 5;
  pointer-events: none;

  ${(props) => {
    switch (props.$pos) {
      case 'tl': return `top: 38px; left: 6px; border-top-width: 2px; border-left-width: 2px; border-top-left-radius: 4px;`;
      case 'tr': return `top: 38px; right: 6px; border-top-width: 2px; border-right-width: 2px; border-top-right-radius: 4px;`;
      case 'bl': return `bottom: 6px; left: 6px; border-bottom-width: 2px; border-left-width: 2px; border-bottom-left-radius: 4px;`;
      case 'br': return `bottom: 6px; right: 6px; border-bottom-width: 2px; border-right-width: 2px; border-bottom-right-radius: 4px;`;
      default: return '';
    }
  }}
`;

/* ─── WINNERS banner ─── */
const WinnersBanner = styled(Box)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0 0 0;
  margin-bottom: 8px;
`;

const BannerShape = styled(Box)`
  position: relative;
  background: linear-gradient(135deg, #b71c1c 0%, #d32f2f 50%, #c62828 100%);
  border-radius: 16px 16px 50% 50%;
  padding: 14px 44px 22px 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(183, 28, 28, 0.4);
  border: 2px solid rgba(255, 215, 0, 0.3);
`;

const BannerText = styled(Typography)`
  && {
    color: #ffd700;
    font-size: 26px;
    font-weight: 900;
    letter-spacing: 4px;
    text-transform: uppercase;
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
    animation: ${bulbGlow} 1.5s ease-in-out infinite;
  }
`;

const BulbDot = styled(Box)<{ $delay: string }>`
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ffe066;
  box-shadow: 0 0 6px #ffcc00, 0 0 12px rgba(255, 204, 0, 0.4);
  animation: ${bulbGlow} 1.5s ease-in-out infinite;
  animation-delay: ${(props) => props.$delay || '0s'};
`;

const RibbonLeft = styled(Box)`
  position: absolute;
  bottom: -10px;
  left: 8px;
  width: 0;
  height: 0;
  border-left: 14px solid #b71c1c;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  transform: rotate(-15deg);
`;

const RibbonRight = styled(Box)`
  position: absolute;
  bottom: -10px;
  right: 8px;
  width: 0;
  height: 0;
  border-right: 14px solid #b71c1c;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  transform: rotate(15deg);
`;

/* ─── Winner slots ─── */
const WinnersList = styled(Box)`
  flex: 1;
  background: rgba(10, 10, 10, 0.75);
  backdrop-filter: blur(16px);
  border: 2px solid rgba(255, 215, 0, 0.15);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  position: relative;
`;

/* ─── Winners Count Header ─── */
const WinnersHeader = styled(Box)`
  padding: 12px 18px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
  background: linear-gradient(
    135deg,
    rgba(40, 30, 10, 0.6) 0%,
    rgba(20, 15, 5, 0.6) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const WinnersHeaderText = styled(Typography)`
  && {
    color: transparent;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 3px;
    text-transform: uppercase;
    background: linear-gradient(
      90deg,
      #ffd700 0%, #fff8dc 30%, #ffd700 50%, #fff8dc 70%, #ffd700 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    animation: ${shimmerText} 4s linear infinite;
  }
`;

const WinnerCountBadge = styled(Box)`
  background: rgba(255, 215, 0, 0.15);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 10px;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 700;
  color: #ffd700;
`;

const WinnerSlot = styled(Box)<{ $isNew?: boolean }>`
  display: flex;
  align-items: center;
  padding: 18px 18px 14px 18px;
  position: relative;
  flex: 1;
  min-height: 68px;
  overflow: hidden;
  transition: background 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 18px;
    right: 18px;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.06) 50%,
      transparent 100%
    );
  }

  &:last-child::after {
    display: none;
  }

  ${(props) =>
    props.$isNew &&
    css`
      animation: ${slideInRight} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
                 ${goldenGlow} 1.5s ease-out 0.3s forwards;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 60%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 215, 0, 0.15) 40%,
          rgba(255, 255, 255, 0.25) 50%,
          rgba(255, 215, 0, 0.15) 60%,
          transparent 100%
        );
        animation: ${shimmerSweep} 0.8s ease-out 0.4s forwards;
        pointer-events: none;
      }
    `}
`;

const SlotAvatar = styled(Avatar)<{ $bgColor: string }>`
  && {
    width: 50px;
    height: 50px;
    font-size: 17px;
    font-weight: 700;
    background-color: ${(props) => props.$bgColor || '#555'};
    border: 2px solid rgba(255, 255, 255, 0.12);
    margin-right: 14px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
`;

const SlotInfo = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SlotName = styled(Typography)`
  && {
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: 0.2px;
  }
`;

const SlotRole = styled(Typography)`
  && {
    color: rgba(255, 255, 255, 0.45);
    font-size: 13px;
    line-height: 1.3;
    letter-spacing: 0.3px;
  }
`;

const RoundBadge = styled(Box)`
  margin-left: auto;
  padding: 6px 14px;
  border-radius: 10px;
  background: rgba(255, 215, 0, 0.15);
  border: 1px solid rgba(255, 215, 0, 0.3);
  font-size: 12px;
  font-weight: 700;
  color: #ffd700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  white-space: nowrap;
`;

const PositionBadge = styled(Box)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;

const RibbonBadge = styled(Box)`
  background: linear-gradient(135deg, #c62828, #e53935);
  color: #ffffff;
  font-size: 14px;
  font-weight: 800;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  position: relative;
  box-shadow: 0 2px 8px rgba(198, 40, 40, 0.4);

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 6px solid #c62828;
  }
`;

const EmptySlotIcon = styled(Box)`
  font-size: 20px;
  opacity: 0.15;
  text-align: center;
  width: 100%;
`;

/* ─── Bottom golden bar ─── */
const BottomBar = styled(Box)`
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 215, 0, 0.3) 20%,
    rgba(255, 215, 0, 0.5) 50%,
    rgba(255, 215, 0, 0.3) 80%,
    transparent 100%
  );
`;

interface WinnersPanelProps {
  winners: Member[];
}

const WinnersPanel: React.FC<WinnersPanelProps> = ({ winners }) => {
  const slots = Array.from({ length: 5 }, (_, i) => winners[i] || null);
  const prevCountRef = useRef(0);
  const [newIndex, setNewIndex] = useState<number | null>(null);

  useEffect(() => {
    if (winners.length > prevCountRef.current) {
      const addedIndex = winners.length - 1;
      setNewIndex(addedIndex);
      const timer = setTimeout(() => setNewIndex(null), 2000);
      prevCountRef.current = winners.length;
      return () => clearTimeout(timer);
    }
    prevCountRef.current = winners.length;
  }, [winners.length]);

  return (
    <PanelContainer>
      {/* Winners banner */}
      <WinnersBanner>
        <BannerShape>
          <BulbDot $delay="0s" style={{ top: -3, left: 16 }} />
          <BulbDot $delay="0.2s" style={{ top: -3, left: 42 }} />
          <BulbDot $delay="0.4s" style={{ top: -3, right: 42 }} />
          <BulbDot $delay="0.6s" style={{ top: -3, right: 16 }} />
          <BulbDot $delay="0.1s" style={{ bottom: 8, left: 10 }} />
          <BulbDot $delay="0.3s" style={{ bottom: 2, left: 32 }} />
          <BulbDot $delay="0.5s" style={{ bottom: 2, right: 32 }} />
          <BulbDot $delay="0.7s" style={{ bottom: 8, right: 10 }} />
          <BulbDot $delay="0.15s" style={{ top: 10, left: -2 }} />
          <BulbDot $delay="0.35s" style={{ top: 30, left: -2 }} />
          <BulbDot $delay="0.55s" style={{ top: 10, right: -2 }} />
          <BulbDot $delay="0.75s" style={{ top: 30, right: -2 }} />

          <BannerText>WINNERS</BannerText>

          <RibbonLeft />
          <RibbonRight />
        </BannerShape>
      </WinnersBanner>

      {/* Winners list */}
      <WinnersList>
        {/* Golden corner accents */}
        {['tl', 'tr', 'bl', 'br'].map((pos) => (
          <Corner key={pos} $pos={pos} />
        ))}

        <WinnersHeader>
          <Box sx={{ fontSize: '14px' }}>🏆</Box>
          <WinnersHeaderText>Hall of Champions</WinnersHeaderText>
          <WinnerCountBadge>{winners.length}/5</WinnerCountBadge>
        </WinnersHeader>

        {slots.map((slot, index) => (
          <WinnerSlot key={index} $isNew={index === newIndex}>
            {slot ? (
              <>
                <SlotAvatar $bgColor={slot.color}>{slot.initials}</SlotAvatar>
                <SlotInfo>
                  <SlotName>{slot.name}</SlotName>
                  <SlotRole>{slot.role}</SlotRole>
                </SlotInfo>
                <RoundBadge>Round {index + 1}</RoundBadge>
              </>
            ) : (
              <>
                <SlotAvatar $bgColor="rgba(255,255,255,0.05)"> </SlotAvatar>
                <SlotInfo>
                  <EmptySlotIcon>🎯</EmptySlotIcon>
                </SlotInfo>
                <RoundBadge style={{ opacity: 0.2 }}>Round {index + 1}</RoundBadge>
              </>
            )}
          </WinnerSlot>
        ))}

        <BottomBar />
      </WinnersList>
    </PanelContainer>
  );
};

export default WinnersPanel;
