import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { getToken, setToken } from "../../redux/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

type ProtectedPageProps = {
  children: ReactNode;
};

const WithAuth = ({ children }: ProtectedPageProps) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const location = useLocation();
  const dispatch = useDispatch();
  const getTokens = useSelector(getToken);

  const token = cookies.get("token");

  useEffect(() => {
    console.log(token, "==================================token");
    dispatch(setToken(token));
    console.log(getTokens, "==================================");

    if (
      !token &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      navigate("/login");
    } else if (location.pathname === "/login" && token) {
      navigate("/");
    }
  }, [dispatch, token, location.pathname, navigate, setToken]);

  if (
    (!token &&
      location.pathname !== "/login" &&
      location.pathname !== "/register") ||
    (location.pathname === "/login" && token)
  ) {
    return null;
  }

  return <>{children}</>;
};

export default WithAuth;
