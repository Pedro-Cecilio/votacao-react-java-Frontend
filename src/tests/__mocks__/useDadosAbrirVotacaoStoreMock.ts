import { DadosUsuarioState } from "../../hooks/useDadosAbrirVotacaoStore"
import { respostaPautaDadosMock } from "./models/respostaPautaDadosMocks"
import * as hook from "../../hooks/../hooks/useDadosAbrirVotacaoStore"

export const useDadosAbrirVotacaoStoreMock = (jestfn: jest.Mock) => {
    const dados: DadosUsuarioState = {
        pautaId: respostaPautaDadosMock().id,
        setPautaId: jestfn
    }
    jest.spyOn(hook, "useDadosAbrirVotacaoStore").mockReturnValue(dados);
}