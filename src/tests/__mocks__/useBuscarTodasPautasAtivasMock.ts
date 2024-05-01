import * as hook from "../../hooks/useBuscarTodasPautasAtivas";
import { listaDeRespostaPautaDados } from "./models/listaDeRespostaPautaDados";

export const useBuscarTodasPautasAtivasMock = (jestfn: jest.Mock) => {
    jest.spyOn(hook, "useBuscarTodasPautasAtivas").mockReturnValue({
        buscarTodasPautasAtivas: jestfn.mockResolvedValue(listaDeRespostaPautaDados())
    })
}