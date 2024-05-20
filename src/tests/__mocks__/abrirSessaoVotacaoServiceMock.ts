import * as abrirSessaoVotacaoService from "../../services/abrirSessaoVotacao.service"
import { respostaPautaDadosMock } from "./models/respostaPautaDadosMocks"

export const abrirSessaoVotacaoServiceMock = ()=>{
    jest.spyOn(abrirSessaoVotacaoService, "abrirSessaoVotacaoService").mockResolvedValue(respostaPautaDadosMock())
}