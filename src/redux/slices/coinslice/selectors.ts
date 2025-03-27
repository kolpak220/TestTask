import { RootState } from "../../store";

export const SelectCoins = (state: RootState) => {
  return state.coin.items;
};

export const FindCoin = (state: RootState, id: string) => {
  if (!state.coin.items || !id) return;

  return state.coin.items.find((obj) => obj.id === id);
};
