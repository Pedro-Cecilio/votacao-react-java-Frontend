import { api } from "../lib/api";
import { ValidarVotoExterno, ValidarVotoExternoResposta } from "../models/sessaoVotacaoModels";

export const loginService = async (email: string, senha: string)=>{
    const autenticacaoDados: AutenticacaoDados = {
        email, 
        senha
    }
    const response = await api.post<AutenticacaoRespostaDados>("/auth/login", autenticacaoDados);
    return response.data;
}

export const validarUsuarioPorCpfESenhaService = async (dados: ValidarVotoExterno) => {
    const resposta = await api.post<ValidarVotoExternoResposta>("/auth/votoExterno", dados);
    return resposta.data;
}