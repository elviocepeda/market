import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  listOfPrivateRoutes,
  listOfPublicRoutes,
} from "../../routers/listOfRoutes";

export const useValidateToken = (token = null, withRedirectHome = true) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      return navigate(listOfPublicRoutes.login);
    } else if (withRedirectHome) {
      return navigate(listOfPrivateRoutes.home);
    } else return;
  }, [navigate, token, withRedirectHome]);
};