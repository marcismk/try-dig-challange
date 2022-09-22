import { client } from "api";
import { ICard } from "interfaces";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CardState {
  error?: string;
  cards: ICard[];
  getCards: () => Promise<void>;
  setCards: (cards: ICard[]) => void;
  updateCard: (card: ICard) => Promise<void>;
}

export const useCardStore = create<CardState>()(
  devtools(
    persist(
      (set, get) => ({
        cards: [],
        getCards: async () => {
          try {
            const url = `${process.env.REACT_APP_API_URL}/swipe`;
            const data = await client({ method: "GET", url });

            if (data) {
              const newRows = data as ICard[];
              set(
                () => ({
                  error: undefined,
                  cards: newRows.reverse(), // Data reversed to display in stack in correct order
                }),
                false,
                { type: "getCards" }
              );
            }
          } catch (err) {
            const { message } = err as Error;
            set(
              () => ({
                error: message,
                cards: [],
              }),
              false,
              { type: "getCards - failed" }
            );
          }
        },
        setCards: (cards) => {
          set(() => ({ cards }), false, { type: "setCards" });
        },
        updateCard: async (updatedCard) => {
          const cards = get().cards;
          const updated = cards.map((card) =>
            card.id === updatedCard.id ? updatedCard : card
          );

          try {
            const url = `${process.env.REACT_APP_API_URL}/swipe`;
            const data = await client({ method: "GET", url });

            if (data) {
              set(() => ({ error: undefined, cards: updated }), false, {
                type: "updateCard",
              });
            }
          } catch (err) {
            const { message } = err as Error;
            set(
              () => ({
                error: message,
              }),
              false,
              { type: "updateCard - failed" }
            );
          }
        },
      }),
      {
        name: "card-storage",
      }
    )
  )
);
