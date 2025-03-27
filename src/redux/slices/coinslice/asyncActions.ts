import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Coin } from "./types";

export const fetchCoins = createAsyncThunk<Coin[] | false>(
  "coins/fetchCoins",
  async () => {
    const url = new URL("https://openapiv1.coinstats.app/coins");

    try {
      const { data } = await axios.get<{ result: Coin[] }>(url.toString(), {
        headers: {
          "X-API-KEY": "ol+L9rqT0Cv1XgyYvlO1yMyNYqJbhLQZeVJswa3v8f4=",
          accept: "application/json",
        },
      });

      return data.result;
    } catch (error) {
      return false;
    }
  }
);
