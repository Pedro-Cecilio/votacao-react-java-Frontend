import { api } from "../lib/api"
import { RespostaPautaDados } from "../models/pautaModels";
import { InserirVotoDados } from "../models/sessaoVotacaoModels";

export const inserirVotoService = async (token: string, dados:InserirVotoDados )=>{
    const resposta = await api.patch<RespostaPautaDados>("/votacao/votar", dados, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return resposta;
}
