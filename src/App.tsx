import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Toaster } from "react-hot-toast";
import usePersistLogin from "./hooks/usePersistLogin";
import LoadingSpinner from "./components/Loader/LoadingSpinner";
import ScrollToTop from "./components/buttons/ScrollToTop";

function App() {
  const { isLoading } = usePersistLogin();
  return (
    <div className="max-w-7xl mx-auto font-primary">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <RouterProvider router={router} />
          <Toaster />
        </div>
      )}
      <ScrollToTop />
    </div>
  );
}

export default App;
