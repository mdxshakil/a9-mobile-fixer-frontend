/* eslint-disable no-undefined */
import { usePersistLoginQuery } from "../redux/features/auth/authApi";
import { userLoggedOut } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { useEffect } from "react";

const usePersistLogin = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isError } = usePersistLoginQuery(undefined);

  useEffect(() => {
    if (isError) {
      localStorage.removeItem("auth");
      dispatch(userLoggedOut());
    }
  }, [dispatch, isError]);
  return { isLoading };
};

export default usePersistLogin;
