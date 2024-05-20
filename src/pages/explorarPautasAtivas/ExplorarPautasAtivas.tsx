import { buscarTodasPautasAtivasService } from "../../services/pauta.service";
import ExplorarPautas from "../components/explorarPautas/ExplorarPautas"

const ExplorarPautasAtivas = ()=>{
    return (
        <ExplorarPautas metodoBuscarPautasBanco={buscarTodasPautasAtivasService}/>
    )
}

export default ExplorarPautasAtivas;