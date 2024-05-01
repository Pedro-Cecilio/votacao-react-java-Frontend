import { api } from "../lib/api"

export const verificarSeUsuarioExistePorCpfService = async (cpf: string) => {
    const resposta = await api.get<VerificarSeUsuarioExisteResposta>(`/usuario/existe?cpf=${cpf}`, );
    return resposta.data;
}
