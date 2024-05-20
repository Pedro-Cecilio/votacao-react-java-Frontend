import * as buscarDetalhesPautaService from "../../services/pauta.service"
import { detalhesPautaDadosMock } from "./models/detalhesPautaDadosMock";


export const detalhesPautaMock = () => {
  
    const detalhesPautaDados = detalhesPautaDadosMock()
    
    const buscarDetalhesPautaServiceMock = () => {
        jest.spyOn(buscarDetalhesPautaService, 'buscarDetalhesPautaService').mockResolvedValue(detalhesPautaDados);
    }
    
    return {
        buscarDetalhesPautaServiceMock,
        detalhesPautaDados
    }

}