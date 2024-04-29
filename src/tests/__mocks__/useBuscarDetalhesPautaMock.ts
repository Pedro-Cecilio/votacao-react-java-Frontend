import * as useBuscarDetalhesPauta from "../../hooks/useBuscarDetalhesPauta"
import { detalhesPautaDadosMock } from "./models/detalhesPautaDadosMock";


export const useDetalhesPautaMock = () => {
  
    const detalhesPautaDados = detalhesPautaDadosMock()
    
    const useBuscarDetalhesPautaMock = (jestfn: jest.Mock<any, any, any>) => {
        jest.spyOn(useBuscarDetalhesPauta, 'useBuscarDetalhesPauta').mockReturnValue({
            buscarDetalhesPauta: jestfn.mockResolvedValue(detalhesPautaDados)
        });
    }
    
    return {
        useBuscarDetalhesPautaMock,
        detalhesPautaDados
    }

}