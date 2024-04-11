import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CadastroUsuario from "../pages/cadastroUsuario/CadastroUsuario";
import App from "../App";

const router = createBrowserRouter([
    {
        path: "",
        element: <App />
    },
    {
        path: "/novoUsuario",
        element: <CadastroUsuario />,
    },
]);

const Routes: React.FC = () => {
    return <RouterProvider router={router} />
}

export default Routes;