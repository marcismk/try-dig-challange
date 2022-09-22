import { useMemo } from "react";
import { Card } from "./Card";
import { ICard } from "interfaces";
import { useCardStore } from "store";
import "./Stack.css";

interface Props {
  currentCard: number;
  cards: ICard[];
  onAction: (value: "like" | "dislike") => void;
}

export const Stack = ({ currentCard, cards, onAction }: Props) => {
  const error = useCardStore((state) => state.error);

  const stack = useMemo(() => {
    if (currentCard === 0) {
      return cards;
    }

    const before = cards.slice(0, currentCard);
    const after = cards.slice(currentCard - 1, cards.length - 1);

    return [...after, ...before] as ICard[];
  }, [currentCard, cards]);

  return (
    <div className="stack">
      {stack &&
        stack.map((card, index) => (
          <Card key={card.id} index={index} card={card} onAction={onAction} />
        ))}
      {error && <span className="error">{error}</span>}
    </div>
  );
};
