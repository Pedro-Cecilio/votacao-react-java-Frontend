
import { buscarTodasPautasService } from "../services/buscarTodasPautas.service"

export const useBuscarTodasPautas = () => {
    const buscarTodasPautas = async (token:string, categoria: string)=>{
        return await buscarTodasPautasService(token, categoria);
    }

    return {
        buscarTodasPautas
    }
}