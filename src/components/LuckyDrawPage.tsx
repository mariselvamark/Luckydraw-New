import React, { useState, useCallback, useMemo } from 'react';
import { Box } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import TopBar from './TopBar';
import ActiveMembers from './ActiveMembers';
import DrawScanner from './DrawScanner';
import WinnersPanel from './WinnersPanel';
import { CommitButton, ActionButtons } from './CommitButton';
import Confetti from './Confetti';
import allMembers, { Member } from '../data/members';
import { playApplause, playConfettiPop } from '../utils/sound';

/* ─── sparkle particles ─── */
const float = keyframes`
  0%   { transform: translateY(0) scale(1); opacity: 0; }
  20%  { opacity: 0.6; }
  80%  { opacity: 0.3; }
  100% { transform: translateY(-100vh) scale(0.3); opacity: 0; }
`;

const PageContainer = styled(Box)`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Background = styled(Box)`
  position: absolute;
  inset: 0;
  z-index: 0;
  background: url('/bg.jpg') center center / cover no-repeat;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
  }
`;

interface SparkleData {
  left: string;
  animDuration: string;
  animDelay: string;
  size: string;
}

const Sparkle = styled(Box)<{
  $left: string;
  $duration: string;
  $delay: string;
  $size: string;
}>`
  position: absolute;
  bottom: -10px;
  left: ${(props) => props.$left};
  width: ${(props) => props.$size};
  height: ${(props) => props.$size};
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%);
  animation: ${float} ${(props) => props.$duration} linear infinite;
  animation-delay: ${(props) => props.$delay};
  z-index: 1;
  pointer-events: none;
`;

const ContentLayer = styled(Box)`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainContent = styled(Box)`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 0 24px;
`;

const LeftColumn = styled(Box)`
  height: 70vh;
  flex: 1;
  max-width: 380px;
`;

const CenterColumn = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const RightColumn = styled(Box)`
  height: 70vh;
  flex: 1;
  max-width: 420px;
`;

const MAX_ROUNDS = 5;

const LuckyDrawPage: React.FC = () => {
  const [winners, setWinners] = useState<Member[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [pendingWinner, setPendingWinner] = useState<Member | null>(null);

  const eligibleMembers = useMemo(
    () => allMembers.filter((m) => !winners.find((w) => w.id === m.id)),
    [winners]
  );

  const handleCommitDraw = useCallback(() => {
    if (currentRound >= MAX_ROUNDS || isDrawing || pendingWinner) return;
    setIsDrawing(true);
  }, [currentRound, isDrawing, pendingWinner]);

  const handleDrawComplete = useCallback((winner: Member) => {
    setPendingWinner(winner);
    setIsDrawing(false);

    // Trigger confetti, pop sound, and applause
    setShowConfetti(true);
    playConfettiPop();
    playApplause(3500);
    setTimeout(() => setShowConfetti(false), 5000);
  }, []);

  const handlePublish = useCallback(() => {
    if (!pendingWinner) return;
    setWinners((prev) => [...prev, pendingWinner]);
    setCurrentRound((prev) => prev + 1);
    setPendingWinner(null);
  }, [pendingWinner]);

  const handleReDraw = useCallback(() => {
    setPendingWinner(null);
    setIsDrawing(true);
  }, []);

  const sparkles = useMemo<SparkleData[]>(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        animDuration: `${8 + Math.random() * 12}s`,
        animDelay: `${Math.random() * 10}s`,
        size: `${2 + Math.random() * 4}px`,
      })),
    []
  );

  return (
    <PageContainer>
      <Background />

      {sparkles.map((s, i) => (
        <Sparkle
          key={i}
          $left={s.left}
          $duration={s.animDuration}
          $delay={s.animDelay}
          $size={s.size}
        />
      ))}

      <ContentLayer>
        <TopBar checkedInCount={2315} />

        <MainContent>
          <LeftColumn>
            <ActiveMembers members={eligibleMembers} />
          </LeftColumn>

          <CenterColumn>
            <DrawScanner
              members={eligibleMembers}
              isDrawing={isDrawing}
              onDrawComplete={handleDrawComplete}
              currentRound={currentRound}
            />
            {pendingWinner ? (
              <ActionButtons onPublish={handlePublish} onReDraw={handleReDraw} />
            ) : (
              <CommitButton
                onClick={handleCommitDraw}
                disabled={currentRound >= MAX_ROUNDS}
                isDrawing={isDrawing}
              />
            )}
          </CenterColumn>

          <RightColumn>
            <WinnersPanel winners={winners} />
          </RightColumn>
        </MainContent>
      </ContentLayer>
      {showConfetti && <Confetti active={showConfetti} />}
    </PageContainer>
  );
};

export default LuckyDrawPage;
