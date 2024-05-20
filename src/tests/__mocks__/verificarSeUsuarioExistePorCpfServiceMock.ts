import * as service from "../../services/verificarSeUsuarioExistePorCpf.service";

export const verificarSeUsuarioExistePorCpfServiceMock = (existe: boolean) => {
    const resposta: VerificarSeUsuarioExisteResposta = {
        existe: existe,
    }
    jest.spyOn(service, "verificarSeUsuarioExistePorCpfService").mockResolvedValue(resposta)
}