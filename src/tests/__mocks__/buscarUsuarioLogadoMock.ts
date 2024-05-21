import { AxiosError } from "axios"
import * as service from "../../services/usuario.service"
import { usuarioRespostaMock } from "./models/usuarioRespostaMock"

export const buscarUsuarioLogadoMock = () => {
    const buscarUsuarioLogadoMockSucesso = () => {
        jest.spyOn(service, "buscarUsuarioLogadoService").mockResolvedValue(usuarioRespostaMock())
    }
    const buscarUsuarioLogadoMockErro = () => {
        const erro: RespostaErro = {
            erro: "Token inválido"
        }
        jest.spyOn(service, "buscarUsuarioLogadoService").mockRejectedValue(new AxiosError(JSON.stringify(erro), "401"))
    }

    return {
        buscarUsuarioLogadoMockSucesso,
        buscarUsuarioLogadoMockErro
    }

}