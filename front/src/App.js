import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./routes/Routes";
import { UserContextProvider } from './context/UserContext';
const routes = createBrowserRouter(ROUTES);

function App() {
  return (
    <>
    <UserContextProvider>
      <RouterProvider router={routes}/>
    </UserContextProvider>
    </>
  );
}

export default App;
