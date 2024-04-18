import { Categoria } from "../enums/categoria";

export interface CriarPautaDados{
    assunto: string;
    categoria: string
}

export interface RespostaPautaDados{
    id: number;
    assunto: string;
    categoria: Categoria;
    usuario: UsuarioResposta;
    sessaoVotacao: SessaoVotacaoResposta | null;
}

interface SessaoVotacaoResposta {
    id: number;
    pauta_id: number;
    votosPositivos: number;
    votosNegativos: number;
    dataAbertura: string;
    dataFechamento: string;
}