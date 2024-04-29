import * as hook from "../../hooks/useBuscarTodasPautasUsuarioLogado";
import { listaDeRespostaPautaDados } from "./models/listaDeRespostaPautaDados";

export const useBuscarTodasPautasUsuarioLogadoMock = (jestfn: jest.Mock) => {
    jest.spyOn(hook, "useBuscarTodasPautasUsuarioLogado").mockReturnValue({
        buscarTodasPautasUsuarioLogado: jestfn.mockResolvedValue(listaDeRespostaPautaDados())
    })
}