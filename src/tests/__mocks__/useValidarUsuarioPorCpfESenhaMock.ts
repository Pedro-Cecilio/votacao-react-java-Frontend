import * as hook from "../../hooks/useValidarUsuarioPorCpfESenha";
import { ValidarVotoExternoResposta } from "../../models/sessaoVotacaoModels";

export const useValidarUsuarioPorCpfESenhaMock = (validarMock: jest.Mock, valido: boolean) => {
    const resposta: ValidarVotoExternoResposta = {
        valido: valido
    }

    jest.spyOn(hook, "useValidarUsuarioPorCpfESenha").mockReturnValue({
        validarUsuarioPorCpfESenha: validarMock.mockResolvedValue(resposta)
    })
}