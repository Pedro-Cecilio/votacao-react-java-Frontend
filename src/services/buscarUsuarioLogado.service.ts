import { api } from "../lib/api"

export const buscarUsuarioLogadoService = async (token: string)=>{
    const response = await api.get<UsuarioResposta>("/usuario/usuarioLogado", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}
