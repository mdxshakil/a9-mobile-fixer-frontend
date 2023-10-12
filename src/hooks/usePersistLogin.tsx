/* eslint-disable no-undefined */
import { usePersistLoginQuery } from "../redux/features/auth/authApi";
import { userLoggedOut } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { useState, useEffect } from "react";

const usePersistLogin = () => {
  const dispatch = useAppDispatch();
  const [skip, setSkip] = useState(true);
  const { isLoading, isError } = usePersistLoginQuery(undefined, {
    skip,
  });

  useEffect(() => {
    //if auth data is not in local storage,
    //means user is not logged in
    //so no need to persist user login
    const localStorageAuth = JSON.parse(localStorage.getItem("auth") as string);
    if (localStorageAuth) {
      setSkip(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      localStorage.removeItem("auth");
      dispatch(userLoggedOut());
    }
  }, [dispatch, isError]);
  return { isLoading };
};

export default usePersistLogin;
