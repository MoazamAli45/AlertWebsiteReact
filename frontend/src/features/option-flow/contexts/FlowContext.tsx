import { createContext, useContext, useReducer } from 'react';
import { FlowAction, FlowContextValue, FlowState } from '../types';
import { optionFlowConfig } from '../config';
import { DateTime } from 'luxon';

export const MAX_PREMIUM = 500000;

const FlowContext = createContext<FlowContextValue | undefined>(undefined);

export function useFlowContext(): FlowContextValue {
  const context = useContext(FlowContext);

  if (context === undefined) {
    throw new Error('useFlowContext must be used within a FlowContextProvider');
  }

  return context;
}

function reducer(state: FlowState, action: FlowAction) {
  const { type, value } = action;
  switch (type) {
    case 'setSymbols':
      return { ...state, symbols: { ...value } };

    case 'setContracts':
      return {
        ...state,
        contracts: { ...value },
      };

    case 'setExpire':
      return {
        ...state,
        expire: {
          min: value[0],
          max: value[1] === optionFlowConfig ? -1 : value[1],
        },
      };

    case 'setPremium':
      return {
        ...state,
        premium: {
          min: value[0] * optionFlowConfig.maxPremium,
          max: value[1] === 1 ? -1 : value[1] * optionFlowConfig.maxPremium,
        },
      };

    case 'setTime':
      return {
        ...state,
        time: value,
      };

    case 'setIsFetching':
      return {
        ...state,
        isFetching: value,
      };

    default:
      return state;
  }
}

const symbols = optionFlowConfig.symbols.reduce(
  (obj, item) => ({
    ...obj,
    [item.toUpperCase()]: true,
  }),
  {},
);

function getLatestMarketOpen() {
  return DateTime.now()
    .setZone('America/New_York')
    .startOf('day')
    .plus({ hours: 9, minutes: 30 });
}

const initialState = {
  symbols,
  contracts: {
    C: true,
    P: true,
  },
  expire: { min: 0, max: -1 },
  premium: { min: 0, max: -1 },
  isFetching: false,
  time: getLatestMarketOpen(),
};

export default function FlowContextProvider({ children }: { children: any }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FlowContext.Provider value={{ state, dispatch }}>
      {children}
    </FlowContext.Provider>
  );
}
