import { api } from "../lib/api"
import { RespostaPautaDados } from "../models/pautaModels";

export const buscarTodasPautasService = async (token: string, categoria:string)=>{
    const resposta = await api.get<RespostaPautaDados[]>(`/pauta?categoria=${categoria}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return resposta;
}
