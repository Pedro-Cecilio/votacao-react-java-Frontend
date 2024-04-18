import { useBuscarTodasPautas } from "../../hooks/useBuscarTodasPautas"
import ExplorarPautas from "../components/explorarPautas/ExplorarPautas"

const ExplorarMinhasPautas = ()=>{
    const {buscarTodasPautas} = useBuscarTodasPautas()
    return (
        <ExplorarPautas metodoBuscarPautasBanco={buscarTodasPautas}/>
    )
}

export default ExplorarMinhasPautas;