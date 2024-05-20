import * as abrirSessaoVotacaoService from "../../services/votacao.service"
import { respostaPautaDadosMock } from "./models/respostaPautaDadosMocks"

export const abrirSessaoVotacaoServiceMock = ()=>{
    jest.spyOn(abrirSessaoVotacaoService, "abrirSessaoVotacaoService").mockResolvedValue(respostaPautaDadosMock())
}