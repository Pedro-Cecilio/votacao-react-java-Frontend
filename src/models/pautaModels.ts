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

interface SessaoVotacaoResposta{
    votosPositivos: number;
    votosNegativos: number;
    pauta_id: number;
}