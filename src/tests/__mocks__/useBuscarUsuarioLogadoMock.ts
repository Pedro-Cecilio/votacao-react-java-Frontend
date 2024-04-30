import { AxiosError } from "axios"
import * as useBuscarUsuarioLogado from "../../hooks/useBuscarUsuarioLogado"
import { usuarioRespostaMock } from "./models/usuarioRespostaMock"

export const useBuscarUsuarioLogadoMock = () => {
    const buscarUsuarioLogadoMockSucesso = (buscarUsuarioLogado:jest.Mock) => {
        jest.spyOn(useBuscarUsuarioLogado, "useBuscarUsuarioLogado").mockReturnValue({
            buscarUsuarioLogado: buscarUsuarioLogado.mockResolvedValue(usuarioRespostaMock())
        })
    }
    const buscarUsuarioLogadoMockErro = (buscarUsuarioLogado:jest.Mock) => {
        const erro: RespostaErro = {
            erro: "Token inválido"
        }
        jest.spyOn(useBuscarUsuarioLogado, "useBuscarUsuarioLogado").mockReturnValue({
            buscarUsuarioLogado: buscarUsuarioLogado.mockRejectedValue(()=>{
                throw new AxiosError(JSON.stringify(erro), "401")
            })
        })
    }

    return {
        buscarUsuarioLogadoMockSucesso,
        buscarUsuarioLogadoMockErro
    }

}