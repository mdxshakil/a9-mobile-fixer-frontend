import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Toaster } from "react-hot-toast";
import usePersistLogin from "./hooks/usePersistLogin";
import LoadingSpinner from "./components/Loader/LoadingSpinner";

function App() {
  const { isLoading } = usePersistLogin();
  return (
    <>
      {isLoading ? <LoadingSpinner /> : <RouterProvider router={router} />}
      <Toaster position="top-right"  />
    </>
  );
}

export default App;
