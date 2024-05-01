import * as hook from "../../hooks/useBuscarDetalhesPauta"
import { detalhesPautaDadosMock } from "./models/detalhesPautaDadosMock";


export const useDetalhesPautaMock = () => {
  
    const detalhesPautaDados = detalhesPautaDadosMock()
    
    const useBuscarDetalhesPautaMock = (jestfn: jest.Mock) => {
        jest.spyOn(hook, 'useBuscarDetalhesPauta').mockReturnValue({
            buscarDetalhesPauta: jestfn.mockResolvedValue(detalhesPautaDados)
        });
    }
    
    return {
        useBuscarDetalhesPautaMock,
        detalhesPautaDados
    }

}