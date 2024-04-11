import { api } from "../lib/api"

export const criarUsuarioService = async (
    dadosUsuario:CriarUsuarioDados
)=>{
    const response = await api.post<CriarUsuarioResposta>("/usuario", dadosUsuario);
    return response.data;
}