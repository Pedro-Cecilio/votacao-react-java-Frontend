import { useBuscarTodasPautas } from "../../hooks/useBuscarTodasPautas"
import ExplorarPautas from "../components/explorarPautas/ExplorarPautas"

const ExplorarPautasAtivas = ()=>{
    const {buscarTodasPautas} = useBuscarTodasPautas()
    return (
        <ExplorarPautas metodoBuscarPautasBanco={buscarTodasPautas}/>
    )
}

export default ExplorarPautasAtivas;