import { api } from "../lib/api"
import { RespostaPautaDados } from "../models/pautaModels";
import { InserirVotoDados } from "../models/sessaoVotacaoModels";

export const inserirVotoService = async (dados:InserirVotoDados, endpoint:string, token?: string )=>{
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const resposta = await api.patch<RespostaPautaDados>(endpoint, dados, config);
    return resposta;
}
