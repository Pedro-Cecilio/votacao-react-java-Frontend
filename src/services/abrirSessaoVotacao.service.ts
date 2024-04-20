import { api } from "../lib/api"
import { RespostaPautaDados } from "../models/pautaModels";
import { AbrirSessaoVotacaoDados } from "../models/sessaoVotacaoModels";

export const abrirSessaoVotacaoService = async (token: string, dados:AbrirSessaoVotacaoDados )=>{
    const resposta = await api.post<RespostaPautaDados[]>("/votacao/abrir", dados, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return resposta;
}
