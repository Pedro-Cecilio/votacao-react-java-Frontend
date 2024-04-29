import { Categoria } from "../../../enums/categoria";
import { RespostaPautaDados } from "../../../models/pautaModels";
import { sessaoVotacaoRespostaMock } from "./sessaoVotacaoRespostaMock";
import { usuarioRespostaMock } from "./usuarioRespostaMock";

export const respostaPautaDadosMock = (): RespostaPautaDados => {

    const resposta: RespostaPautaDados = {

        id: 1,
        assunto: "Você sabe dirigir?",
        categoria: Categoria.TRANSPORTE,
        usuario: usuarioRespostaMock(),
        sessaoVotacao: sessaoVotacaoRespostaMock()

    }
    return resposta;
}
