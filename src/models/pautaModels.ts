import { Categoria } from "../enums/categoria";
import { SessaoVotacaoResposta } from "./sessaoVotacaoModels";

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

