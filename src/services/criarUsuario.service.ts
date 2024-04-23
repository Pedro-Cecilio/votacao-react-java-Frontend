import { api } from "../lib/api"

export const criarUsuarioService = async (
    dadosUsuario:CriarUsuarioDados,
    token: string
)=>{
    const response = await api.post<CriarUsuarioResposta>("/usuario", dadosUsuario, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.data;
}