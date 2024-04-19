import { abrirSessaoVotacaoService } from "../services/abrirSessaoVotacao.service";


export const useAbrirSessaoVotacao = () => {
    const abrirSessaoVotacao = async (token:string, dados: AbrirSessaoVotacaoDados)=>{
        return await abrirSessaoVotacaoService(token, dados);
    }

    return {
        abrirSessaoVotacao
    }
}