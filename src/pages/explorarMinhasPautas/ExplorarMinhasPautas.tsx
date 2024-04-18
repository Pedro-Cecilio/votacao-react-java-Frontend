import { useBuscarTodasPautasUsuarioLogado } from "../../hooks/useBuscarTodasPautasUsuarioLogado";
import ExplorarPautas from "../components/explorarPautas/ExplorarPautas"

const ExplorarMinhasPautas = ()=>{
    const {buscarTodasPautasUsuarioLogado} = useBuscarTodasPautasUsuarioLogado()
    return (
        <ExplorarPautas metodoBuscarPautasBanco={buscarTodasPautasUsuarioLogado}/>
    )
}

export default ExplorarMinhasPautas;