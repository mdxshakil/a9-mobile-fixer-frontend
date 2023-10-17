import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "../Loader/LoadingSpinner";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const { email, role } = user || {};
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>();
  const from = location?.state?.from?.pathname || "/";

  useEffect(() => {
    // Show loading spinner if the authentication status is being determined
    if (isLoading) {
      setLoading(true);
      return;
    }

    // Redirect to the login page if the user is not authenticated
    if (!email) {
      navigate("/login", { replace: true, state: { from } });
    } else {
      setLoading(false);
    }

    // Protect specific routes based on the user's role
    const protectedRoutes = ["/my-cart", "/my-orders", "/confirm-booking"];
    const isProtectedRoute = protectedRoutes.some((route) =>
      location.pathname.startsWith(route)
    );

    if (role !== "user" && isProtectedRoute) {
      navigate("/");
      return;
    }
  }, [email, from, isLoading, navigate, location.pathname, role]);

  if (loading) {
    return <LoadingSpinner />;
  }

  // If no redirection occurs, render the wrapped children
  return children;
};

export default RequireAuth;
