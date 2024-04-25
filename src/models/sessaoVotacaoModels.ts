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
    pautaId: number,
    tipoDeVoto: TipoDeVoto
    cpf?:string
    senha?:string
}

export enum StatusSessaoVotacao{
    APROVADA = "APROVADA", 
    EM_ANDAMENTO = "EM_ANDAMENTO",
    REPROVADA = "REPROVADA"
}

export interface ValidarVotoExterno{
    cpf:string
    senha:string
}

export interface ValidarVotoExternoResposta{
    valido:boolean
}