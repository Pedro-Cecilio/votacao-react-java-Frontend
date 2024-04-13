import { loginUsuarioService } from "../services/loginUsuario.service";

export const useLoginUsuario = () => {
    const loginUsuario = async (email: string, senha: string)=>{
        const autenticacaoDto: AutenticacaoDados = {
            email, 
            senha
        }
        const resposta = await loginUsuarioService(autenticacaoDto);
        return resposta;
    }

    return {
        loginUsuario
    }
}