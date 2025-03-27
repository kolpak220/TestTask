import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Coin, Coins, Status } from "./types";
import { fetchCoins } from "./asyncActions";

const initialState: Coins = {
  items: [],
  state: Status.LOADING,
};

export const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    deleteItem(state, action: PayloadAction<string>) {
      if (state.items) {
        const exist = state.items.findIndex((obj) => obj.id === action.payload);
        if (exist >= 0) {
          state.items.splice(exist, 1);
        }
      }
    },
    likeItem(state, action: PayloadAction<string>) {
      if (state.items) {
        const exist = state.items.find((obj) => obj.id === action.payload);
        if (exist) {
          exist.liked = !exist.liked;
        }
      }
    },
    plusItem(state, action: PayloadAction<Coin>) {
      if (state.items) {
        const exist = state.items.find((obj) => obj.id === action.payload.id);
        if (exist) {
          Object.assign(exist, action.payload);
        } else {
          state.items.push(action.payload);
        }
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      fetchCoins.fulfilled,
      (state, action: PayloadAction<Coin[] | false>) => {
        state.items = action.payload;
        state.state = Status.SUCCESS;
      }
    );
    builder.addCase(fetchCoins.pending, (state) => {
      state.state = Status.LOADING;
    });
    builder.addCase(fetchCoins.rejected, (state) => {
      state.state = Status.ERROR;
    });
  },
});

export const { deleteItem, likeItem, plusItem } = coinSlice.actions;

export default coinSlice.reducer;
