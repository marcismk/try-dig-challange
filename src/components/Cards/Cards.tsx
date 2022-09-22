import cn from "classnames";
import {
  IconThumbDown,
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconThumbUp,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import { useCardStore } from "store";
import { Stack } from "./Stack";
import "./Cards.css";

export const Cards = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const cards = useCardStore((state) => state.cards);
  const getCards = useCardStore((state) => state.getCards);
  const updateCard = useCardStore((state) => state.updateCard);

  useEffect(() => {
    if (cards.length === 0) {
      getCards();
    }
  }, [cards.length, getCards]);

  const getCurrentCardStatus = () => cards[currentCard].status;

  const handlePrev = () => {
    setCurrentCard(currentCard > 0 ? currentCard - 1 : cards.length - 1);
  };

  const handleNext = () => {
    setCurrentCard(currentCard < cards.length - 1 ? currentCard + 1 : 0);
  };

  const handleLikeDislike = async (value: string) => {
    const updated = { ...cards[currentCard], status: value };
    await updateCard(updated);
    handleNext();
  };

  return (
    <div className="cards-wrapper">
      <div className="actions">
        <IconThumbDown
          className={cn({ disliked: getCurrentCardStatus() === "dislike" })}
          onClick={() => handleLikeDislike("dislike")}
        />
        <IconArrowNarrowLeft onClick={handlePrev} />
      </div>
      <Stack
        currentCard={currentCard}
        cards={cards}
        onAction={handleLikeDislike}
      />
      <div className="actions">
        <IconArrowNarrowRight onClick={handleNext} />
        <IconThumbUp
          className={cn({ liked: getCurrentCardStatus() === "like" })}
          onClick={() => handleLikeDislike("like")}
        />
      </div>
    </div>
  );
};
