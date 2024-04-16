
import { buscarTodasPautasService } from "../services/buscarTodasPautas.service"

export const useBuscarTodasPautas = () => {
    const buscarTodasPautas = async (token:string)=>{
        return await buscarTodasPautasService(token);
    }

    return {
        buscarTodasPautas
    }
}