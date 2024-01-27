import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Toaster } from "react-hot-toast";
import usePersistLogin from "./hooks/usePersistLogin";
import LoadingSpinner from "./components/Loader/LoadingSpinner";
import ScrollToTop from "./components/buttons/ScrollToTop";

function App() {
  const { isLoading } = usePersistLogin();
  return (
    <>
      {isLoading ? <LoadingSpinner /> : <RouterProvider router={router} />}
      <ScrollToTop />
      <Toaster />
    </>
  );
}

export default App;
