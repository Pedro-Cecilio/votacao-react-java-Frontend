
import { buscarTodasPautasUsuarioLogadoService } from "../services/buscarTodasPautasUsuarioLogado.service";

export const useBuscarTodasPautasUsuarioLogado = () => {
    const buscarTodasPautasUsuarioLogado = async (token:string, categoria: string)=>{
        return await buscarTodasPautasUsuarioLogadoService(token, categoria);
    }

    return {
        buscarTodasPautasUsuarioLogado
    }
}