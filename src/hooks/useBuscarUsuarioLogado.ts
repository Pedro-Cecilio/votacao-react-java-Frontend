import { buscarUsuarioLogadoService } from "../services/buscarUsuarioLogado.service";

export const useBuscarUsuarioLogado = () => {
    const buscarUsuarioLogado = async (token:string): Promise<UsuarioResposta>=>{

        const resposta = await buscarUsuarioLogadoService(token);
        return resposta;
    }

    return {
        buscarUsuarioLogado
    }
}