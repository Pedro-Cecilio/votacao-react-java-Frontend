import { useEffect, useState } from "react";
import { useDadosUsuarioStore } from "../../hooks/useDadosUsuarioStore";
import ExplorarPautas from "../components/explorarPautas/ExplorarPautas"
import NaoAutorizado from "../components/naoAutorizado/NaoAutorizado";
import { buscarTodasPautasUsuarioLogadoService } from "../../services/buscarTodasPautasUsuarioLogado.service";

const ExplorarMinhasPautas = ()=>{
    const { admin } = useDadosUsuarioStore();
    const [paginaCarregada, setPaginaCarregada] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener('load', () => {
            setPaginaCarregada(true);
        });
    }, []);

    if(paginaCarregada && !admin){
        return <NaoAutorizado />
    }
    return (
        <ExplorarPautas metodoBuscarPautasBanco={buscarTodasPautasUsuarioLogadoService}/>
    )
        
        
    
}

export default ExplorarMinhasPautas;