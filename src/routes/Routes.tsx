import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CadastroUsuario from "../pages/cadastroUsuario/CadastroUsuario";
import App from "../App";
import Login from "../pages/login/Login";

const router = createBrowserRouter([
    {
        path: "",
        element: <App />
    },
    {
        path: "/novoUsuario",
        element: <CadastroUsuario />,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

const Routes: React.FC = () => {
    return <RouterProvider router={router} />
}

export default Routes;