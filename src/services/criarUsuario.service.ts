import { api } from "../lib/api"

export const criarUsuarioService = async (
    email: string,
    senha: string,
    nome: string, sobrenome: string,
    cpf: string,
    admin: boolean,
    token: string
) => {
    const autenticacaoDto: AutenticacaoDados = {
        email, 
        senha
    }
    const dadosUsuario: CriarUsuarioDados = {
        autenticacaoDto,
        nome,
        sobrenome,
        cpf,
        admin
    }
    const response = await api.post<CriarUsuarioResposta>("/usuario", dadosUsuario, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return response.data;
}