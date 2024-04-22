import { ValidarVotoExterno } from "../models/sessaoVotacaoModels";
import { validarUsuarioPorCpfESenhaService } from "../services/validarUsuarioPorCpfESenha.service";


export const useValidarUsuarioPorCpfESenha = () => {
    const validarUsuarioPorCpfESenha = async (dados: ValidarVotoExterno)=>{
        return await validarUsuarioPorCpfESenhaService(dados);
    }

    return {
        validarUsuarioPorCpfESenha
    }
}