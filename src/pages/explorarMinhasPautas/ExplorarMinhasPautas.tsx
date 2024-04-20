import { useBuscarTodasPautasUsuarioLogado } from "../../hooks/useBuscarTodasPautasUsuarioLogado";
import { useDadosUsuarioStore } from "../../hooks/useDadosUsuarioStore";
import ExplorarPautas from "../components/explorarPautas/ExplorarPautas"
import NaoAutorizado from "../components/naoAutorizado/NaoAutorizado";

const ExplorarMinhasPautas = ()=>{
    const {buscarTodasPautasUsuarioLogado} = useBuscarTodasPautasUsuarioLogado()
    const { admin } = useDadosUsuarioStore();
    return (
        admin ? <ExplorarPautas metodoBuscarPautasBanco={buscarTodasPautasUsuarioLogado}/> : <NaoAutorizado/>
    )
        
        
    
}

export default ExplorarMinhasPautas;