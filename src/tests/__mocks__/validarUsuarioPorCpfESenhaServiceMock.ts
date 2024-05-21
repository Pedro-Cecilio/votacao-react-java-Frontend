import * as service from "../../services/auth.service";
import { ValidarVotoExternoResposta } from "../../models/sessaoVotacaoModels";

export const validarUsuarioPorCpfESenhaServiceMock = (valido: boolean) => {
    const resposta: ValidarVotoExternoResposta = {
        valido: valido
    }

    jest.spyOn(service, "validarUsuarioPorCpfESenhaService").mockResolvedValue(resposta)
}