import * as hook from "../../hooks/useAbrirSessaoVotacao"
import { respostaPautaDadosMock } from "./models/respostaPautaDadosMocks"

export const useAbrirSessaoVotacaoMock = (jestfn: jest.Mock)=>{
    jest.spyOn(hook, "useAbrirSessaoVotacao").mockReturnValue({
        abrirSessaoVotacao: jestfn.mockResolvedValue(respostaPautaDadosMock())
    })
}