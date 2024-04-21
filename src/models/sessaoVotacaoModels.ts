import { TipoDeVoto } from "../enums/tipoDeVoto";

export interface SessaoVotacaoResposta {
    id: number;
    pauta_id: number;
    votosPositivos: number;
    votosNegativos: number;
    dataAbertura: string;
    dataFechamento: string;
    sessaoAtiva: boolean;
}

export interface AbrirSessaoVotacaoDados{
    pautaId:number
    minutos:number
}

export interface InserirVotoDados{
    usuarioId: number
    pautaId: number,
    tipoDeVoto: TipoDeVoto
}

export enum StatusSessaoVotacao{
    APROVADA = "APROVADA", 
    EM_ANDAMENTO = "EM_ANDAMENTO",
    REPROVADA = "REPROVADA"
}