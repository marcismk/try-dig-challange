import { ICard } from "interfaces";

interface Props {
  card: ICard;
}

export const Card = ({ card }: Props) => {
  return (
    <div className="card">
      <img src={card.image} alt={card.title} />
      <h3>{card.title}</h3>
      <p>{card.body}</p>
    </div>
  );
};
