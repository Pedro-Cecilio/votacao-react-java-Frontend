import { useEffect, useState } from "react";
import { useBuscarTodasPautasUsuarioLogado } from "../../hooks/useBuscarTodasPautasUsuarioLogado";
import { useDadosUsuarioStore } from "../../hooks/useDadosUsuarioStore";
import ExplorarPautas from "../components/explorarPautas/ExplorarPautas"
import NaoAutorizado from "../components/naoAutorizado/NaoAutorizado";

const ExplorarMinhasPautas = ()=>{
    const {buscarTodasPautasUsuarioLogado} = useBuscarTodasPautasUsuarioLogado()
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
        <ExplorarPautas metodoBuscarPautasBanco={buscarTodasPautasUsuarioLogado}/>
    )
        
        
    
}

export default ExplorarMinhasPautas;