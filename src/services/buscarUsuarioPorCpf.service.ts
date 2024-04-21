import { api } from "../lib/api"

export const buscarUsuarioPorCpfService = async (cpf: string) => {
    const resposta = await api.get<UsuarioResposta>(`/usuario?cpf=${cpf}`, );
    return resposta;
}
