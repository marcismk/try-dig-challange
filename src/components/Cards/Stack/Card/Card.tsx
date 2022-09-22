import { ICard } from "interfaces";
import { useMemo } from "react";
import { useSwipeable } from "react-swipeable";
import "./Card.css";

interface Props {
  card: ICard;
  index: number;
  onAction: (value: "like" | "dislike") => void;
}

export const Card = ({ card, index, onAction }: Props) => {
  const handlers = useSwipeable({
    onSwipeStart: (data) => {
      const target = data.event.target as HTMLElement;

      if (target && target.tagName === "DIV") {
        const element = target as HTMLDivElement;
        element.style.translate = `${data.deltaX}px 0px`;
        element.style.transform =
          data.deltaX > 0 ? "rotate(5deg)" : "rotate(-5deg)";
      }
    },
    onSwiped: (data) => {
      const { target } = data.event;

      onAction(data.deltaX > 0 ? "like" : "dislike");

      if (target) {
        const element = target as HTMLDivElement;
        element.style.translate = `0px 0px`;
        element.style.transform = `rotate(0deg)`;
      }
    },
  });

  const inlineStyles = useMemo(() => {
    const margin = index * 0.8;
    return {
      backgroundImage: `url(${card.image})`,
      marginTop: `${margin}rem`,
      marginLeft: `${margin}rem`,
    };
  }, [card.image, index]);

  return (
    <div {...handlers} className="card" style={inlineStyles}>
      <div className="card-content">
        <h3 className="card-header">{card.title}</h3>
        <p className="card-description">{card.body}</p>
      </div>
    </div>
  );
};
