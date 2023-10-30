import { OptionFlowConfigProps } from "@/features/option-flow/types";

export const optionFlowConfig: OptionFlowConfigProps = {
  symbols: ['tsla', 'dkng', 'spy', 'meta', 'amzn', 'aapl', 'googl', 'nvda', 'iwm', 'epd', 'qqq', 'amc', 'cmg', 'amd', 'intc', 'gs', 'uber', 'dis', 'hood', 'lyft', 'mdb', 'lcid', 'gme', 'wmt', 'abnb', 'roku', 'shop', 'coin', 'cvna', 'adbe', 'amgn', 'sq', 'hd', 'kvue', 'tgt', 'pypl', 'mrna', 'se', 'slv', 'snap', 'msft', 'sofi', 'baba', 'pbr'],
  maxPremium: 100000000,
  maxExpiration: 800, //days,
  premiumColorBreakpoints: [0, 100_000, 500_000, 1_000_000, 4_900_000],
  premiumColors: [
    { fg: '#1c1c1c', bg: 'rgba(117,117,117, 0.0001)' },
    { fg: '#1c73ff', bg: 'rgba(77, 118, 153, 0.30)' },
    { fg: '#222661', bg: 'rgba(68, 166, 141, 0.30)' },
    { fg: '#f0c83a', bg: 'rgba(153, 70, 63, 0.3)' },
    { fg: '#C57AFF', bg: 'rgba(255, 251, 0, 0.30)' },
  ],
  contractColor: { P: '#B5210B', C: '#4E9B47' },
  executionColor: {
    ASK: '#DDFFE7',
    BID: '#DDFFE7',
    ABOVE_ASK: '#FFD700',
    BELOW_BID: '#FFD700',
    MID: '#96AED0',
  }
};
