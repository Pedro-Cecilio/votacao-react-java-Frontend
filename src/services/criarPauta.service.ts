import { api } from "../lib/api"
import { CriarPautaDados, RespostaPautaDados } from "../models/pautaModels";

export const criarPautaService = async (
    assunto: string,
    categoria: string,
    token: string
) => {
    const dadosPauta: CriarPautaDados = {
        assunto, 
        categoria
    }
    const response = await api.post<RespostaPautaDados>("/pauta", dadosPauta, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.data;
}