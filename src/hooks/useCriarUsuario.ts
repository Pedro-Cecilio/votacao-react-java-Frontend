import { criarUsuarioService } from "../services/criarUsuario.service"

export const useCriarUsuario = () => {
    const criarUsuario = async (email: string, senha: string, nome: string, sobrenome: string, cpf: string, admin: boolean)=>{
        const autenticacaoDto: AutenticacaoDados = {
            email, 
            senha
        }
        const criarUsuarioDados: CriarUsuarioDados = {
            autenticacaoDto,
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