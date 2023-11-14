// src/components/Card.tsx
import React from 'react';

interface CardProps {
  image: string;
  isFlipped: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ image, isFlipped, onClick }) => {
  return (
    <div
      className={`card ${isFlipped ? 'flipped' : ''}`}
      onClick={onClick}
      style={{ backgroundImage: `url(${image})` }}
    />
  );
};

export default Card;
