import * as useAbrirSessaoVotacao from "../../hooks/useAbrirSessaoVotacao"
import { respostaPautaDadosMock } from "./models/respostaPautaDadosMocks"

export const useAbrirSessaoVotacaoMock = (jestfn: jest.Mock)=>{
    jest.spyOn(useAbrirSessaoVotacao, "useAbrirSessaoVotacao").mockReturnValue({
        abrirSessaoVotacao: jestfn.mockResolvedValue(respostaPautaDadosMock())
    })
}