import { TipoDeVoto } from "../enums/tipoDeVoto";
import { InserirVotoDados } from "../models/sessaoVotacaoModels";
import { inserirVotoService } from "../services/inserirVoto.service"

export const useInserirVoto = () => {
    const inserirVoto = async (usuarioId:number, pautaId: number, tipoDeVoto: TipoDeVoto, token: string)=>{
        const inserirVotoDados: InserirVotoDados = {
            usuarioId,
            pautaId, 
            tipoDeVoto
        }
        
        const resposta = await inserirVotoService(token, inserirVotoDados);
        return resposta;
    }

    return {
        inserirVoto
    }
}