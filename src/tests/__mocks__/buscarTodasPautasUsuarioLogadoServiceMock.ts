import * as service from "../../services/pauta.service";
import { listaDeRespostaPautaDados } from "./models/listaDeRespostaPautaDados";

export const buscarTodasPautasUsuarioLogadoServiceMock = () => {
    jest.spyOn(service, "buscarTodasPautasUsuarioLogadoService").mockResolvedValue(listaDeRespostaPautaDados());
}