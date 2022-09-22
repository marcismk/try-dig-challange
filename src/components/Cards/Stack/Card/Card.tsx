import { ICard } from "interfaces";
import { useMemo } from "react";
import "./Card.css";

interface Props {
  card: ICard;
  index: number;
}

export const Card = ({ card, index }: Props) => {
  const inlineStyles = useMemo(() => {
    const margin = index * 0.8;
    return {
      backgroundImage: `url(${card.image})`,
      marginTop: `${margin}rem`,
      marginLeft: `${margin}rem`,
    };
  }, [card.image, index]);

  return (
    <div className="card" style={inlineStyles}>
      <div className="card-content">
        <h3 className="card-header">{card.title}</h3>
        <p className="card-description">{card.body}</p>
      </div>
    </div>
  );
};
