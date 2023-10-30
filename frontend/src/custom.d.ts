declare module 'black-scholes' {
  export function blackScholes(stockPrice: number, strikePrice: number, timeToExpiration: number, riskFreeRate: number, volatility: number, optionType: string): number;
}