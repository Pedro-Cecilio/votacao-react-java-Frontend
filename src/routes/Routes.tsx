import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CadastroUsuario from "../pages/cadastroUsuario/CadastroUsuario";
import App from "../App";
import Login from "../pages/login/Login";
import CadastroAdmin from "../pages/cadastroAdmin/CadastroAdmin";
import PaginaInicial from "../pages/paginaInicial/PaginaInicial";
import RotasComCabecalho from "./RotasComCabecalho";

const router = createBrowserRouter([
    {
        path: "",
        element: <App />
    },
    {
        path: "/novoAdmin",
        element: <CadastroAdmin />,
    },
    {
        path: "/novoUsuario",
        element: <CadastroUsuario />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        element: <RotasComCabecalho/>,
        children:[
            {
                path: "/paginaInicial",
                element: <PaginaInicial />,
            },
        ]
    },
    
]);

const Routes: React.FC = () => {
    return <RouterProvider router={router} />
}

export default Routes;