import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import ExplorarPautasAtivas from "../pages/explorarPautasAtivas/ExplorarPautasAtivas";
import ExplorarMinhasPautas from "../pages/explorarMinhasPautas/ExplorarMinhasPautas";
import Cadastro from "../pages/cadastro/Cadastro";
import Detalhes from "../pages/detalhes/Detalhes";
import VotoExterno from "../pages/votoExterno/VotoExterno";
import NaoEncontrado from "../pages/components/naoEncontrado/NaoEncontrado";
import EmpacotadorRotasAutenticadas from "./EmpacotadorRotasAutenticadas";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/votar/:id",
        element: <VotoExterno />,
    },
    
    {           
        element: <EmpacotadorRotasAutenticadas />,
        children: [
            {
                path: "/cadastro",
                element: <Cadastro />,
            },
            {
                path: "/explorar",
                element: <ExplorarPautasAtivas />,
            },
            {
                path: "/minhasPautas",
                element: <ExplorarMinhasPautas />,
            },
            {
                path: "/detalhes/:id",
                element: <Detalhes/>,
            }
        ]
    },
    {
        path: "*",
        element: <NaoEncontrado />,
    }
    
    

]);

const Routes: React.FC = () => {
    return <RouterProvider router={router} />
}

export default Routes;