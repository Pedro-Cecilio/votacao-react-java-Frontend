import * as buscarTodasPautasAtivasService from "../../services/pauta.service";
import { listaDeRespostaPautaDados } from "./models/listaDeRespostaPautaDados";

export const buscarTodasPautasAtivasServiceMock = () => {
    jest.spyOn(buscarTodasPautasAtivasService, "buscarTodasPautasAtivasService").mockResolvedValue(listaDeRespostaPautaDados())
}