import { buscarPautaPorIdService } from "../services/buscarPautaPorId.service";


export const useBuscarPautaPorId = () => {
    const buscarPautaPorId = async (pautaId: string)=>{
        return await buscarPautaPorIdService(pautaId);
    }

    return {
        buscarPautaPorId
    }
}