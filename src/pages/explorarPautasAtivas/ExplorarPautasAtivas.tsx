import { useBuscarTodasPautasAtivas } from "../../hooks/useBuscarTodasPautasAtivas"
import ExplorarPautas from "../components/explorarPautas/ExplorarPautas"

const ExplorarPautasAtivas = ()=>{
    const {buscarTodasPautasAtivas} = useBuscarTodasPautasAtivas()
    return (
        <ExplorarPautas metodoBuscarPautasBanco={buscarTodasPautasAtivas}/>
    )
}

export default ExplorarPautasAtivas;