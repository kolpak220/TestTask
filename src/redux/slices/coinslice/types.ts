export interface Coin {
  liked?: boolean;
  id: string;
  icon: string;
  name: string;
  symbol: string;
  rank?: number;
  price: number;
  priceBtc?: number;
  volume?: number;
  marketCap?: number;
  availableSupply?: number;
  totalSupply?: number;
  fullyDilutedValuation?: number;
  priceChange1h?: number;
  priceChange1d?: number;
  priceChange1w?: number;
  websiteUrl?: string;
  redditUrl?: string;
  twitterUrl?: string;
  contractAddress?: string; // Optional as it wasn't marked required
  decimals?: number; // Optional as it wasn't marked required
  explorers?: string[];
  liquidityScore?: number;
  volatilityScore?: number;
  marketCapScore?: number;
  riskScore?: number;
  avgChange?: number;
}
export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
export interface Coins {
  items: Coin[] | false;
  state: Status;
}
