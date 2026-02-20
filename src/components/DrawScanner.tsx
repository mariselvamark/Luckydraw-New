import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import styled, { keyframes, css } from 'styled-components';
import { Member } from '../data/members';

/* ─── keyframes ─── */
const scanLine = keyframes`
  0%   { top: 10%; }
  50%  { top: 85%; }
  100% { top: 10%; }
`;

const fadeInUp = keyframes`
  0%   { opacity: 0; transform: translateY(30px) scale(0.9); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`;

const starPop = keyframes`
  0%   { transform: scale(0) rotate(-30deg); opacity: 0; }
  60%  { transform: scale(1.4) rotate(5deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
`;

const nameFlash = keyframes`
  0%   { opacity: 1; }
  50%  { opacity: 0.4; }
  100% { opacity: 1; }
`;

const glowPulse = keyframes`
  0%   { box-shadow: 0 0 20px rgba(255, 215, 0, 0.3), inset 0 0 30px rgba(255, 215, 0, 0.05); }
  50%  { box-shadow: 0 0 50px rgba(255, 215, 0, 0.5), 0 0 80px rgba(255, 180, 0, 0.15), inset 0 0 40px rgba(255, 215, 0, 0.08); }
  100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.3), inset 0 0 30px rgba(255, 215, 0, 0.05); }
`;

const avatarGlow = keyframes`
  0%   { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.4); }
  50%  { box-shadow: 0 0 0 12px rgba(255, 215, 0, 0), 0 0 30px rgba(255, 215, 0, 0.3); }
  100% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0), 0 0 20px rgba(255, 215, 0, 0.15); }
`;

const crownBounce = keyframes`
  0%   { transform: translateX(-50%) scale(0) rotate(-20deg); opacity: 0; }
  50%  { transform: translateX(-50%) scale(1.2) rotate(5deg); opacity: 1; }
  100% { transform: translateX(-50%) scale(1) rotate(0deg); opacity: 1; }
`;

const labelSlide = keyframes`
  0%   { opacity: 0; transform: translateY(10px); letter-spacing: 12px; }
  100% { opacity: 1; transform: translateY(0); letter-spacing: 6px; }
`;

const shimmerText = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const sparkleFloat = keyframes`
  0%   { opacity: 0; transform: translateY(0) scale(0); }
  20%  { opacity: 1; transform: translateY(-5px) scale(1); }
  80%  { opacity: 1; transform: translateY(-25px) scale(0.8); }
  100% { opacity: 0; transform: translateY(-35px) scale(0); }
`;

/* ─── styled components ─── */
const ScannerContainer = styled(Box)<{ $revealed: boolean }>`
  width: 420px;
  height: 340px;
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(16px);
  border: 2px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.$revealed &&
    css`
      animation: ${glowPulse} 2.5s ease-in-out infinite;
      border-color: rgba(255, 215, 0, 0.4);
      background: radial-gradient(
        ellipse at center,
        rgba(40, 30, 10, 0.95) 0%,
        rgba(10, 10, 10, 0.95) 70%
      );
    `}
`;

/* Golden corner accents for revealed state */
const CornerAccent = styled(Box)<{ $pos: string }>`
  position: absolute;
  width: 30px;
  height: 30px;
  border-color: rgba(255, 215, 0, 0.5);
  border-style: solid;
  border-width: 0;
  opacity: 0;
  transition: opacity 0.5s ease;

  ${(props) => {
    switch (props.$pos) {
      case 'tl': return css`top: 12px; left: 12px; border-top-width: 2px; border-left-width: 2px; border-top-left-radius: 6px;`;
      case 'tr': return css`top: 12px; right: 12px; border-top-width: 2px; border-right-width: 2px; border-top-right-radius: 6px;`;
      case 'bl': return css`bottom: 12px; left: 12px; border-bottom-width: 2px; border-left-width: 2px; border-bottom-left-radius: 6px;`;
      case 'br': return css`bottom: 12px; right: 12px; border-bottom-width: 2px; border-right-width: 2px; border-bottom-right-radius: 6px;`;
      default: return '';
    }
  }}
`;

const ScanLineBar = styled(Box)`
  position: absolute;
  left: 10%;
  right: 10%;
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 215, 0, 0.4) 15%,
    #ffd700 40%,
    #fff8dc 50%,
    #ffd700 60%,
    rgba(255, 215, 0, 0.4) 85%,
    transparent 100%
  );
  border-radius: 2px;
  animation: ${scanLine} 2.5s ease-in-out infinite;
  box-shadow: 0 0 12px rgba(255, 215, 0, 0.5), 0 0 25px rgba(255, 215, 0, 0.15);
`;

const ShuffleOverlay = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  animation: ${nameFlash} 0.15s ease-in-out infinite;
`;

const ShuffleAvatar = styled(Avatar)<{ $bgColor: string }>`
  && {
    width: 68px;
    height: 68px;
    font-size: 24px;
    font-weight: 700;
    background-color: ${(props) => props.$bgColor || '#C62828'};
    border: 3px solid rgba(255, 255, 255, 0.2);
  }
`;

const ShuffleName = styled(Typography)`
  && {
    color: #ffffff;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  }
`;

const ShuffleRole = styled(Typography)`
  && {
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
    text-align: center;
  }
`;

/* ─── Revealed state ─── */
const RevealContent = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  animation: ${fadeInUp} 0.7s ease-out forwards;
  position: relative;
  z-index: 2;
`;

const WinnerLabel = styled(Box)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 28px;
  border-radius: 30px;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 180, 0, 0.1) 100%);
  border: 1.5px solid rgba(255, 215, 0, 0.4);
  margin-bottom: 10px;
  animation: ${labelSlide} 0.6s ease-out 0.2s both;

  & > span {
    color: transparent;
    font-size: 18px;
    font-weight: 900;
    letter-spacing: 8px;
    text-transform: uppercase;
    background: linear-gradient(
      90deg,
      #ffd700 0%, #fff8dc 25%, #ffd700 50%, #fff8dc 75%, #ffd700 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    animation: ${shimmerText} 3s linear 1s infinite;
    font-family: inherit;
  }
`;

const AvatarWrapper = styled(Box)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WinnerAvatar = styled(Avatar)<{ $bgColor: string }>`
  && {
    width: 90px;
    height: 90px;
    font-size: 32px;
    font-weight: 700;
    background-color: ${(props) => props.$bgColor || '#C62828'};
    border: 3px solid rgba(255, 215, 0, 0.7);
    animation: ${avatarGlow} 2s ease-out 0.3s;
    position: relative;
    z-index: 2;
  }
`;

const CrownIcon = styled(Box)`
  position: absolute;
  top: -22px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
  z-index: 3;
  animation: ${crownBounce} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s both;
  filter: drop-shadow(0 2px 6px rgba(255, 215, 0, 0.5));
`;

const AvatarRing = styled(Box)`
  position: absolute;
  width: 106px;
  height: 106px;
  border-radius: 50%;
  border: 2px solid rgba(255, 215, 0, 0.2);
  z-index: 1;
  animation: ${avatarGlow} 2.5s ease-in-out infinite;
`;

const WinnerName = styled(Typography)`
  && {
    color: #ffffff;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    letter-spacing: 0.5px;
    margin-top: 4px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }
`;

const WinnerRole = styled(Typography)`
  && {
    color: rgba(255, 255, 255, 0.55);
    font-size: 14px;
    text-align: center;
    font-weight: 400;
    letter-spacing: 0.5px;
  }
`;

const Divider = styled(Box)`
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.5), transparent);
  margin: 2px 0;
`;

const StarsRow = styled(Box)`
  display: flex;
  gap: 8px;
  margin-top: 2px;
`;

const Star = styled(Box)<{ $delay: string }>`
  font-size: 28px;
  color: #ffd700;
  text-shadow: 0 0 12px rgba(255, 215, 0, 0.7);
  animation: ${starPop} 0.5s ease-out forwards;
  animation-delay: ${(props) => props.$delay || '0s'};
  opacity: 0;
`;

/* Tiny floating sparkles around the avatar */
const MiniSparkle = styled(Box)<{ $left: string; $delay: string; $size: number }>`
  position: absolute;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  border-radius: 50%;
  background: #ffd700;
  box-shadow: 0 0 ${(props) => props.$size * 2}px rgba(255, 215, 0, 0.6);
  animation: ${sparkleFloat} 2s ease-out infinite;
  animation-delay: ${(props) => props.$delay};
  left: ${(props) => props.$left};
  top: 50%;
  z-index: 1;
`;

interface DrawScannerProps {
  members: Member[];
  isDrawing: boolean;
  onDrawComplete: (winner: Member) => void;
  currentRound: number;
}

type Phase = 'idle' | 'shuffling' | 'revealed';

const SPARKLES = [
  { left: '8%',  delay: '0s',   size: 3 },
  { left: '15%', delay: '0.5s', size: 2 },
  { left: '25%', delay: '1.2s', size: 4 },
  { left: '75%', delay: '0.3s', size: 3 },
  { left: '85%', delay: '0.8s', size: 2 },
  { left: '92%', delay: '1.5s', size: 3 },
];

const DrawScanner: React.FC<DrawScannerProps> = ({ members, isDrawing, onDrawComplete, currentRound }) => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [shuffleMember, setShuffleMember] = useState<Member | null>(null);
  const [winner, setWinner] = useState<Member | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startShuffle = useCallback(() => {
    if (!members || members.length === 0) return;

    setPhase('shuffling');
    setWinner(null);

    let count = 0;
    const totalShuffles = 30 + Math.floor(Math.random() * 15);

    intervalRef.current = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * members.length);
      setShuffleMember(members[randomIndex]);
      count++;

      if (count >= totalShuffles) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        const winnerIndex = Math.floor(Math.random() * members.length);
        const selectedWinner = members[winnerIndex];
        setShuffleMember(selectedWinner);

        timeoutRef.current = setTimeout(() => {
          setWinner(selectedWinner);
          setPhase('revealed');
          onDrawComplete(selectedWinner);
        }, 400);
      }
    }, 80);
  }, [members, onDrawComplete]);

  useEffect(() => {
    if (isDrawing) {
      startShuffle();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isDrawing, startShuffle]);

  // Reset to idle when round advances (after Publish)
  useEffect(() => {
    setPhase('idle');
    setWinner(null);
    setShuffleMember(null);
  }, [currentRound]);

  const isRevealed = phase === 'revealed';

  return (
    <ScannerContainer $revealed={isRevealed}>
      {/* Golden corner accents */}
      {['tl', 'tr', 'bl', 'br'].map((pos) => (
        <CornerAccent key={pos} $pos={pos} style={{ opacity: isRevealed ? 1 : 0 }} />
      ))}

      {/* Floating sparkles during reveal */}
      {isRevealed && SPARKLES.map((s, i) => (
        <MiniSparkle key={i} $left={s.left} $delay={s.delay} $size={s.size} />
      ))}

      {phase === 'idle' && <ScanLineBar />}

      {phase === 'shuffling' && shuffleMember && (
        <ShuffleOverlay>
          <ShuffleAvatar $bgColor={shuffleMember.color}>
            {shuffleMember.initials}
          </ShuffleAvatar>
          <ShuffleName>{shuffleMember.name}</ShuffleName>
          <ShuffleRole>{shuffleMember.role}</ShuffleRole>
        </ShuffleOverlay>
      )}

      {isRevealed && winner && (
        <RevealContent>
          <WinnerLabel>
            <span>🎉 WINNER 🎉</span>
          </WinnerLabel>
          <AvatarWrapper>
            <AvatarRing />
            <CrownIcon>👑</CrownIcon>
            <WinnerAvatar $bgColor={winner.color}>
              {winner.initials}
            </WinnerAvatar>
          </AvatarWrapper>
          <WinnerName>{winner.name}</WinnerName>
          <Divider />
          <WinnerRole>{winner.role}</WinnerRole>
          <StarsRow>
            <Star $delay="0.3s">★</Star>
            <Star $delay="0.5s">★</Star>
            <Star $delay="0.7s">★</Star>
          </StarsRow>
        </RevealContent>
      )}
    </ScannerContainer>
  );
};

export default DrawScanner;
