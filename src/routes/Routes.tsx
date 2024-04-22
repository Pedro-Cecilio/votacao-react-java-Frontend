import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import RotasComCabecalho from "./RotasComCabecalho";
import RotasAutenticadas from "./RotasAutenticadas";
import ExplorarPautasAtivas from "../pages/explorarPautasAtivas/ExplorarPautasAtivas";
import ExplorarMinhasPautas from "../pages/explorarMinhasPautas/ExplorarMinhasPautas";
import Cadastro from "../pages/cadastro/Cadastro";
import Detalhes from "../pages/detalhes/Detalhes";
import VotoExterno from "../pages/votoExterno/VotoExterno";
import NaoEncontrado from "../pages/components/naoEncontrado/NaoEncontrado";

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
        element: <RotasAutenticadas />,
        children: [
            
            {
                element: <RotasComCabecalho />,
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