import { criarUsuarioService } from "../services/criarUsuario.service"

export const useCriarUsuario = () => {
    const criarUsuario = async (email: string, senha: string, nome: string, sobrenome: string, cpf: string, admin: boolean)=>{
        const criarAutenticacaoDto: CriarAutenticacaoDados = {
            email, 
            senha
        }
        const criarUsuarioDados: CriarUsuarioDados = {
            criarAutenticacaoDto,
            nome,
            sobrenome,
            cpf,
            admin
        }
        const resposta = await criarUsuarioService(criarUsuarioDados);
        return resposta;
    }

    return {
        criarUsuario
    }
}