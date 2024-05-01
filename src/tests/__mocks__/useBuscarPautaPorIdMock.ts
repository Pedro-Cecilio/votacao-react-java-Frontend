import { AxiosError } from "axios";
import * as hook from "../../hooks/useBuscarPautaPorId";
import { respostaPautaDadosMock } from "./models/respostaPautaDadosMocks";

export const useBuscarPautaPorIdMock = () => {
    const buscarPautaPorIdEncontrada = (buscarPautaPorIdMock: jest.Mock)=>{
        jest.spyOn(hook, "useBuscarPautaPorId").mockReturnValue({
            buscarPautaPorId: buscarPautaPorIdMock.mockResolvedValue(respostaPautaDadosMock())
        })
    }
    const buscarPautaPorIdNaoEncontrada = (buscarPautaPorIdMock: jest.Mock)=>{
        jest.spyOn(hook, "useBuscarPautaPorId").mockReturnValue({
            buscarPautaPorId: buscarPautaPorIdMock.mockRejectedValue(()=>{
                throw new AxiosError<RespostaErro>("Pauta não encontrada", "404")
            })
        })
    }

    return {
        buscarPautaPorIdEncontrada,
        buscarPautaPorIdNaoEncontrada
    }
}