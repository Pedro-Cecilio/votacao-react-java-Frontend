import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CadastroUsuario from "../pages/cadastroUsuario/CadastroUsuario";
import Login from "../pages/login/Login";
import CadastroAdmin from "../pages/cadastroAdmin/CadastroAdmin";
import RotasComCabecalho from "./RotasComCabecalho";
import RotasAutenticadas from "./RotasAutenticadas";
import ExplorarPautasAtivas from "../pages/explorarPautasAtivas/ExplorarPautasAtivas";
import ExplorarMinhasPautas from "../pages/explorarMinhasPautas/ExplorarMinhasPautas";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
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
                        path: "/explorar",
                        element: <ExplorarPautasAtivas />,
                    },
                    {
                        path: "/minhasPautas",
                        element: <ExplorarMinhasPautas />,
                    }
                ]
            },
        ]
    }
    
    

]);

const Routes: React.FC = () => {
    return <RouterProvider router={router} />
}

export default Routes;