import { createContext, useReducer } from "react";
import { initialState } from "./initialState";
import { AppReducer } from "./AppReducer";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
export default AppProvider;
