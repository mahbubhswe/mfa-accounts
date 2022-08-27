import { createContext, useReducer } from "react";
import {
  useLocalStorage,
  writeStorage,
  deleteFromStorage,
} from "@rehooks/local-storage";
export const contextStore = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN": {
      const loginUser = action.payload;
      writeStorage("userInfo", loginUser);
      return { ...state, userInfo: loginUser };
    }
    case "USER_LOGOUT": {
      deleteFromStorage("userInfo");
      return { ...state, userInfo: null };
    }

    default:
      return state;
  }
};
export default function StoreProvider(props) {
  const [userInfo] = useLocalStorage("userInfo");
  const [balance] = useLocalStorage("balance");
  const initialState = {
    userInfo: userInfo ? userInfo : null,
    balance: balance ? balance : null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <contextStore.Provider value={value}>
      {props.children}
    </contextStore.Provider>
  );
}
