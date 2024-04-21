import { buscarDetalhesPautaService } from "../services/buscarDetalhesPauta.service";


export const useBuscarDetalhesPauta = () => {
    const buscarDetalhesPauta = async (token:string, pautaId: string)=>{
        return await buscarDetalhesPautaService(token, pautaId);
    }

    return {
        buscarDetalhesPauta
    }
}