import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import { Member } from '../data/members';

const scrollUp = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
`;




const shimmerHeader = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const PanelContainer = styled(Box)`
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 10, 0.75);
  backdrop-filter: blur(16px);
  border: 2px solid rgba(255, 215, 0, 0.15);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
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
      case 'tl': return `top: 6px; left: 6px; border-top-width: 2px; border-left-width: 2px; border-top-left-radius: 4px;`;
      case 'tr': return `top: 6px; right: 6px; border-top-width: 2px; border-right-width: 2px; border-top-right-radius: 4px;`;
      case 'bl': return `bottom: 6px; left: 6px; border-bottom-width: 2px; border-left-width: 2px; border-bottom-left-radius: 4px;`;
      case 'br': return `bottom: 6px; right: 6px; border-bottom-width: 2px; border-right-width: 2px; border-bottom-right-radius: 4px;`;
      default: return '';
    }
  }}
`;

const Header = styled(Box)`
  padding: 16px 18px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.12);
  background: linear-gradient(
    135deg,
    rgba(40, 30, 10, 0.8) 0%,
    rgba(20, 15, 5, 0.8) 100%
  );
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const HeaderIcon = styled(Box)`
  font-size: 20px;
  filter: brightness(2) saturate(1.5);
`;

const HeaderText = styled(Typography)`
  && {
    color: transparent;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 3px;
    text-transform: uppercase;
    text-align: center;
    background: linear-gradient(
      90deg,
      #ffd700 0%, #fff8dc 30%, #ffd700 50%, #fff8dc 70%, #ffd700 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    animation: ${shimmerHeader} 4s linear infinite;
  }
`;

const MemberCount = styled(Box)`
  background: rgba(255, 215, 0, 0.15);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 10px;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 700;
  color: #ffd700;
  letter-spacing: 0.5px;
`;

const ListWrapper = styled(Box)`
  flex: 1;
  overflow: hidden;
  position: relative;
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 6%,
    black 94%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 6%,
    black 94%,
    transparent 100%
  );
`;

const ScrollingList = styled(Box)<{ $duration: number }>`
  animation: ${scrollUp} ${(props) => props.$duration || 20}s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`;

const MemberRow = styled(Box)`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 18px;
  transition: all 0.25s ease;
  cursor: default;
  position: relative;

  &:hover {
    background: linear-gradient(
      90deg,
      rgba(255, 215, 0, 0.06) 0%,
      rgba(255, 215, 0, 0.03) 100%
    );
  }

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
`;

const MemberAvatar = styled(Avatar)<{ $bgColor: string }>`
  && {
    width: 44px;
    height: 44px;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.5px;
    background-color: ${(props) => props.$bgColor || '#C62828'};
    border: 2px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    transition: border-color 0.3s ease;
  }
`;

const MemberInfo = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const MemberName = styled(Typography)`
  && {
    color: #ffffff;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: 0.2px;
  }
`;

const MemberRole = styled(Typography)`
  && {
    color: rgba(255, 255, 255, 0.45);
    font-size: 12px;
    font-weight: 400;
    line-height: 1.3;
    letter-spacing: 0.3px;
  }
`;

/* ─── Bottom gradient bar ─── */
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

interface ActiveMembersProps {
  members: Member[];
}

const ActiveMembers: React.FC<ActiveMembersProps> = ({ members }) => {
  const doubledMembers = [...members, ...members];
  const scrollDuration = members.length * 2;

  return (
    <PanelContainer>
      {/* Golden corner accents */}
      {['tl', 'tr', 'bl', 'br'].map((pos) => (
        <Corner key={pos} $pos={pos} />
      ))}

      <Header>
        <HeaderIcon>👥</HeaderIcon>
        <HeaderText>Active Members</HeaderText>
      </Header>

      <ListWrapper>
        <ScrollingList $duration={scrollDuration}>
          {doubledMembers.map((member, index) => (
            <MemberRow key={`${member.id}-${index}`}>
              <MemberAvatar $bgColor={member.color}>
                {member.initials}
              </MemberAvatar>
              <MemberInfo>
                <MemberName>{member.name}</MemberName>
                <MemberRole>{member.role}</MemberRole>
              </MemberInfo>
            </MemberRow>
          ))}
        </ScrollingList>
      </ListWrapper>

      <BottomBar />
    </PanelContainer>
  );
};

export default ActiveMembers;
