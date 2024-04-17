
import { Categoria } from "../enums/categoria";
import { buscarTodasPautasService } from "../services/buscarTodasPautas.service"

export const useBuscarTodasPautas = () => {
    const buscarTodasPautas = async (token:string, categoria:Categoria | "")=>{
        return await buscarTodasPautasService(token, categoria);
    }

    return {
        buscarTodasPautas
    }
}