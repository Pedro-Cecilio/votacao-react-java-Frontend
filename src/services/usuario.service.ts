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

export const verificarSeUsuarioExistePorCpfService = async (cpf: string) => {
    const resposta = await api.get<VerificarSeUsuarioExisteResposta>(`/usuario/existe?cpf=${cpf}`, );
    return resposta.data;
}

export const buscarUsuarioLogadoService = async (token: string)=>{
    const response = await api.get<UsuarioResposta>("/usuario/usuarioLogado", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}
