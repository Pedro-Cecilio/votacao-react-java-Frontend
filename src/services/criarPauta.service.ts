import { api } from "../lib/api"
import { CriarPautaDados, RespostaPautaDados } from "../models/pautaModels";

export const criarPautaService = async (
    dadosPauta: CriarPautaDados, 
    token: string
)=>{
    const response = await api.post<RespostaPautaDados>("/pauta", dadosPauta, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.data;
}