import { api } from "../lib/api"

export const loginUsuarioService = async (email: string, senha: string)=>{
    const autenticacaoDados: AutenticacaoDados = {
        email, 
        senha
    }
    const response = await api.post<AutenticacaoRespostaDados>("/auth/login", autenticacaoDados);
    return response.data;
}