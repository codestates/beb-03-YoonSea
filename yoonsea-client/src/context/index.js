import { createContext, useReducer } from 'react';
import { SET_WEB3, SET_ACCOUNT, SET_TOKEN_CONTRACT } from './action';
import { dotenv } from 'dotenv';
import abi from '../contract/erc721Abi';

dotenv.config();
console.log('adsfasf', process.env.CONTRACT_ADDRESS);
const contractAddress = process.env.CONTRACT_ADDRESS;

// context 초기화
const initialState = {
  web3: '',
  account: '',
  contractAddr: contractAddress,
};

// Context 객체 생성 => Provider, Consumer 속성이 있다.
const Context = createContext({});

const setContract = async (web) => {
  try {
    let result = await new web.eth.Contract(abi, contractAddress);
    return result;
  } catch (err) {
    console.log(err);
  }
};

// 각 액션에 동작하는 Reducer 구현
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WEB3:
      return {
        ...state,
        web3: action.payload,
      };
    case SET_ACCOUNT:
      return {
        ...state,
        account: action.payload,
      };
    case SET_TOKEN_CONTRACT:
      return setContract(state.web3);
    default:
      return state;
  }
};

// 전체 컴포넌트를 감싸는 최상위 component
const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, StoreProvider };
