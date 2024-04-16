import { api } from "../lib/api"
import { RespostaPautaDados } from "../models/pautaModels";

export const buscarTodasPautasService = async (token: string)=>{
    const resposta = await api.get<RespostaPautaDados[]>("/pauta", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return resposta;
}
