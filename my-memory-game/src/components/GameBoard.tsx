// src/components/GameBoard.tsx
import React, { useState, useEffect } from 'react';
import Card from './Card';

interface CardType {
  id: number;
  image: string;
  isFlipped: boolean;
}

const GameBoard: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);

  useEffect(() => {
    // Gọi API để lấy danh sách các card (đảm bảo có ít nhất 2 thẻ cho mỗi hình)
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/photos');
        const data = await response.json();

        const cardData: CardType[] = data.map((item: any, index: number) => ({
          id: index,
          image: item.url,
          isFlipped: false,
        }));

        // Duplicate cards to create matching pairs
        const duplicatedCards: CardType[] = [...cardData, ...cardData];
        
        // Shuffle cards
        const shuffledCards = duplicatedCards.sort(() => Math.random() - 0.5);

        setCards(shuffledCards);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (index: number) => {
    if (!flippedIndices.includes(index)) {
      // Card chưa được lật
      setFlippedIndices((prevFlipped) => [...prevFlipped, index]);
  
      if (flippedIndices.length + 1 === 2) {
        // Có đủ hai card đã lật, kiểm tra cặp giống nhau
        const firstIndex = flippedIndices[0];
        const secondIndex = index;
  
        const isFirstPair = cards[firstIndex].image === cards[secondIndex].image;
  
        if (isFirstPair) {
          // Cặp card giống nhau, giữ ở trạng thái đã lật
        } else {
          // Không phải cặp card giống nhau, lật lại cả hai
          setTimeout(() => {
            setFlippedIndices([]);
            setCards((prevCards) =>
              prevCards.map((card) => ({ ...card, isFlipped: false }))
            );
          }, 1000);
        }
      }
    }
  };
  

  return (
    <div className="game-board">
      {cards.map((card, index) => (
        <Card
          key={card.id}
          image={card.image}
          isFlipped={flippedIndices.includes(index) || card.isFlipped}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </div>
  );
};

export default GameBoard;
