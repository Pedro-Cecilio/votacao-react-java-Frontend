
import { buscarTodasPautasAtivasService } from "../services/buscarTodasPautasAtivas.service"

export const useBuscarTodasPautasAtivas = () => {
    const buscarTodasPautasAtivas = async (token:string, categoria: string)=>{
        return await buscarTodasPautasAtivasService(token, categoria);
    }

    return {
        buscarTodasPautasAtivas
    }
}