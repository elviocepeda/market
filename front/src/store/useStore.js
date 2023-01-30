import { useContext } from "react";
import { AppContext } from "./AppProvider";

export const useStore = () => {
  const appState = useContext(AppContext)[0];
  const appDispatch = useContext(AppContext)[1];
  return { appState, appDispatch };
};
