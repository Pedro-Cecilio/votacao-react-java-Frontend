import * as service from "../../services/buscarTodasPautasUsuarioLogado.service";
import { listaDeRespostaPautaDados } from "./models/listaDeRespostaPautaDados";

export const buscarTodasPautasUsuarioLogadoServiceMock = () => {
    jest.spyOn(service, "buscarTodasPautasUsuarioLogadoService").mockResolvedValue(listaDeRespostaPautaDados());
}