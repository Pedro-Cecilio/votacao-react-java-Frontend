import { api } from "../lib/api"

export const loginUsuarioService = async (
    autenticacaoDados: AutenticacaoDados
)=>{
    const response = await api.post<AutenticacaoRespostaDados>("/auth/login", autenticacaoDados);
    return response.data;
}