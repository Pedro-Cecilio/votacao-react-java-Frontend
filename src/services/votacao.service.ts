import { api } from "../lib/api"
import { RespostaPautaDados } from "../models/pautaModels";
import { AbrirSessaoVotacaoDados, InserirVotoDados } from "../models/sessaoVotacaoModels";

export const abrirSessaoVotacaoService = async (token: string, dados:AbrirSessaoVotacaoDados )=>{
    const resposta = await api.post<RespostaPautaDados>("/votacao/abrir", dados, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return resposta.data;
}

export const inserirVotoService = async (dados:InserirVotoDados, endpoint:string, token?: string )=>{
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const resposta = await api.patch<RespostaPautaDados>(endpoint, dados, config);
    return resposta.data;
}