import { buscarDetalhesPautaService } from "../services/buscarDetalhesPautaService.service";


export const useBuscarDetalhesPauta = () => {
    const buscarDetalhesPauta = async (token:string, pautaId: string)=>{
        return await buscarDetalhesPautaService(token, pautaId);
    }

    return {
        buscarDetalhesPauta
    }
}