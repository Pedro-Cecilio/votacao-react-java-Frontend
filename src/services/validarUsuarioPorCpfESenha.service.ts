import { api } from "../lib/api"
import { ValidarVotoExterno, ValidarVotoExternoResposta } from "../models/sessaoVotacaoModels";

export const validarUsuarioPorCpfESenhaService = async (dados: ValidarVotoExterno) => {
    const resposta = await api.post<ValidarVotoExternoResposta>("/auth/votoExterno", dados);
    return resposta;
}
