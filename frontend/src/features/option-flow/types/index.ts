import { DateTime } from 'luxon';

export interface FlowData {
  key: string;
  timestamp: number;
  symbol: string;
  expiration: string;
  strike: number;
  contract: string;
  price: number;
  size: number;
  premium: number;
  volume: number;
  execution: string;
  dte: number;
  askPrice: number;
  askSize: number;
  bidPrice: number;
  bidSize: number;
  underlyingPrice: number;
}

export interface FlowContextValue {
  dispatch: React.Dispatch<{
    type: string;
    value: any;
  }>;
  state: FlowState;
}

export interface FlowState {
  symbols: { [key: string]: boolean };
  contracts: { [key: string]: boolean };
  expire: { min: number; max: number };
  premium: { min: number; max: number };
  isFetching: boolean;
  time: DateTime;
}

export interface FlowAction {
  type: string;
  value: any;
}

export interface OptionFlowConfigProps {
  symbols: string[];
  maxPremium: number;
  maxExpiration: number;
  premiumColorBreakpoints: number[];
  premiumColors: { fg: string; bg: string }[];
  contractColor: { P: string; C: string };
  executionColor: {
    ASK: string;
    BID: string;
    ABOVE_ASK: string;
    BELOW_BID: string;
    MID: string;
  };
}

export interface Order {
  Symbol: string;
  Time: string;
  'C/P': string;
  Strike: string;
  'Exp Date': string;
  Side: string;
  Size: string;
  Price: string;
  Prems: string;
  DTE: string;
  'Spot Price': string;
  Volume: string;
  'Open Interest': string;
  Trade: string;
  [key: string]: string; // Index signature allowing any
}
