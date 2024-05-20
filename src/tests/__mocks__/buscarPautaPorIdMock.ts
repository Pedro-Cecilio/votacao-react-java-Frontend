import { AxiosError } from "axios";
import * as buscarPautaPorIdService from "../../services/pauta.service";
import { respostaPautaDadosMock } from "./models/respostaPautaDadosMocks";

export const buscarPautaPorIdMock = () => {
    const buscarPautaPorIdEncontrada = () => {
        jest.spyOn(buscarPautaPorIdService, "buscarPautaPorIdService").mockResolvedValue(respostaPautaDadosMock())
    }

    const buscarPautaPorIdNaoEncontrada = () => {
        jest.spyOn(buscarPautaPorIdService, "buscarPautaPorIdService").mockRejectedValue(new AxiosError<RespostaErro>("Pauta não encontrada", "404"))
    }

    return {
        buscarPautaPorIdEncontrada,
        buscarPautaPorIdNaoEncontrada
    }
}