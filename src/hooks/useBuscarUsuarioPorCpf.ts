import { buscarUsuarioPorCpfService } from "../services/buscarUsuarioPorCpf.service";


export const useBuscarUsuarioPorCpf = () => {
    const buscarUsuarioPorCpf = async (cpf: string)=>{
        return await buscarUsuarioPorCpfService(cpf);
    }

    return {
        buscarUsuarioPorCpf
    }
}