import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "../Loader/LoadingSpinner";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const { email } = user || {};
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>();
  const from = location?.state?.from?.pathname || "/";

  // Check the user's authentication state.
  useEffect(() => {
    if (isLoading) {
      setLoading(true);
      return;
    }

    if (!email) {
      navigate("/login", { replace: true, state: { from } });
    } else {
      setLoading(false);
    }
  }, [email, from, isLoading, navigate]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return children;
};

export default RequireAuth;



