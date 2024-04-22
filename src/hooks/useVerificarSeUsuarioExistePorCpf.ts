import { verificarSeUsuarioExistePorCpfService } from "../services/verificarSeUsuarioExistePorCpf.service";


export const useVerificarSeUsuarioExistePorCpf = () => {
    const verificarSeUsuarioExistePorCpf = async (cpf: string)=>{
        return await verificarSeUsuarioExistePorCpfService(cpf);
    }

    return {
        verificarSeUsuarioExistePorCpf
    }
}