import * as hook from "../../hooks/useVerificarSeUsuarioExistePorCpf";

export const useVerificarSeUsuarioExistePorCpfMock = (verificarMock: jest.Mock, existe: boolean) => {
    const resposta: VerificarSeUsuarioExisteResposta = {
        existe: existe,
    }
    jest.spyOn(hook, "useVerificarSeUsuarioExistePorCpf").mockReturnValue({
        verificarSeUsuarioExistePorCpf: verificarMock.mockResolvedValue(resposta)
    })
}