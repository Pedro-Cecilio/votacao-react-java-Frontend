import { Categoria } from "../../../enums/categoria";
import { RespostaPautaDados } from "../../../models/pautaModels";
import { sessaoVotacaoRespostaMock } from "./sessaoVotacaoRespostaMock";
import { usuarioRespostaMock } from "./usuarioRespostaMock";


export const listaDeRespostaPautaDados = (): RespostaPautaDados[]=>{
    const listaRespostas: RespostaPautaDados[] = [
        {
            id: 1,
            assunto: "Você sabe dirigir?",
            categoria: Categoria.TRANSPORTE,
            usuario: usuarioRespostaMock(),
            sessaoVotacao: sessaoVotacaoRespostaMock()
        },
        {
            id: 2,
            assunto: "Possui uma comida favorita?",
            categoria: Categoria.ASSUNTOS_GERAIS,
            usuario: usuarioRespostaMock(),
            sessaoVotacao: sessaoVotacaoRespostaMock()
        },
        {
            id: 3,
            assunto: "Você pratica algum esporte regularmente?",
            categoria: Categoria.SAUDE,
            usuario: usuarioRespostaMock(),
            sessaoVotacao: sessaoVotacaoRespostaMock()
        },
        {
            id: 4,
            assunto: "você sabe programar em Java?",
            categoria: Categoria.EDUCACAO,
            usuario: usuarioRespostaMock(),
            sessaoVotacao: sessaoVotacaoRespostaMock()
        }
    ];
    return listaRespostas;
    
}