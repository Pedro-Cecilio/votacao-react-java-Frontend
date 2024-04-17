import { Categoria } from "../enums/categoria";
import { api } from "../lib/api"
import { RespostaPautaDados } from "../models/pautaModels";

export const buscarTodasPautasService = async (token: string, categoria:Categoria | "")=>{
    const resposta = await api.get<RespostaPautaDados[]>(`/pauta?categoria=${categoria}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return resposta;
}
