import * as service from "../../services/validarUsuarioPorCpfESenha.service";
import { ValidarVotoExternoResposta } from "../../models/sessaoVotacaoModels";

export const validarUsuarioPorCpfESenhaServiceMock = (valido: boolean) => {
    const resposta: ValidarVotoExternoResposta = {
        valido: valido
    }

    jest.spyOn(service, "validarUsuarioPorCpfESenhaService").mockResolvedValue(resposta)
}