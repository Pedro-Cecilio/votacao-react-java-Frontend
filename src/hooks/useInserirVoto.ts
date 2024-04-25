import { TipoDeVoto } from "../enums/tipoDeVoto";
import { InserirVotoDados } from "../models/sessaoVotacaoModels";
import { inserirVotoService } from "../services/inserirVoto.service";

export const useInserirVoto = () => {
    const inserirVotoInterno = async (pautaId: number, tipoDeVoto: TipoDeVoto, token: string)=>{
        const inserirVotoDados: InserirVotoDados = {
            pautaId, 
            tipoDeVoto
        }
        
        const resposta = await inserirVotoService(inserirVotoDados, "/votacao/votoInterno", token);
        return resposta;
    }
    const inserirVotoExterno = async (pautaId: number, tipoDeVoto: TipoDeVoto, cpf: string, senha:string)=>{
        const inserirVotoDados: InserirVotoDados = {
            pautaId, 
            tipoDeVoto,
            cpf,
            senha
        }
        
        const resposta = await inserirVotoService(inserirVotoDados, "/votacao/votoExterno");
        return resposta;
    }

    return {
        inserirVotoInterno,
        inserirVotoExterno
    }
}