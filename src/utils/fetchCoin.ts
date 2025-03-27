import axios from "axios";
import { Coin } from "../redux/slices/coinslice/types";

async function fetchCoin(id: string): Promise<Coin | false | any> {
  try {
    const url = new URL("https://openapiv1.coinstats.app/coins" + `/${id}`);
    if (id == undefined) {
      throw new TypeError();
    }

    const response = await axios.get<Coin>(url.toString(), {
      headers: {
        "X-API-KEY": "ol+L9rqT0Cv1XgyYvlO1yMyNYqJbhLQZeVJswa3v8f4=",
        accept: "application/json",
      },
    });
    return response;
  } catch {
    return false;
  }
}

export default fetchCoin;
