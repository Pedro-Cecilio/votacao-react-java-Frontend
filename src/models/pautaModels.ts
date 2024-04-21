import { Categoria } from "../enums/categoria";
import { SessaoVotacaoResposta, StatusSessaoVotacao } from "./sessaoVotacaoModels";

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

export interface DetalhesPautaDados{
    dadosPauta: RespostaPautaDados;
    status: StatusSessaoVotacao;
}
