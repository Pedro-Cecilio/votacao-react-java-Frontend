import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CadastroUsuario from "../pages/cadastroUsuario/CadastroUsuario";
import Login from "../pages/login/Login";
import CadastroAdmin from "../pages/cadastroAdmin/CadastroAdmin";
import PaginaInicial from "../pages/paginaInicial/PaginaInicial";
import RotasComCabecalho from "./RotasComCabecalho";
import RotasAutenticadas from "./RotasAutenticadas";
import Pautas from "../pages/pautas/Pautas";

const router = createBrowserRouter([
    {
        
        element: <RotasAutenticadas />,
        children: [
            {
                path: "/novoAdmin",
                element: <CadastroAdmin />,
            },
            {
                path: "/novoUsuario",
                element: <CadastroUsuario />,
            },
            
            {
                element: <RotasComCabecalho />,
                children: [
                    {
                        path: "/paginaInicial",
                        element: <PaginaInicial />,
                    },
                    {
                        path: "/pautas",
                        element: <Pautas />,
                    }
                ]
            },
        ]
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