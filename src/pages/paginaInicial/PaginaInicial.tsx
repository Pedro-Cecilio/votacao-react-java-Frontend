import { Flex } from "@chakra-ui/react";
import { useDadosUsuarioStore } from "../../hooks/useDadosUsuarioStore";
import ModalNovaPauta from "./components/ModalNovaPauta";
import { useState } from "react";
import Botao from "../components/botao/Botao";

const PaginaInicial = () => {
    const { admin } = useDadosUsuarioStore();
    const [modalNovaPautaAberto, setModalNovaPautaAberto] = useState(false);
    const mudarModalNovaPautaAberto = () => {
        setModalNovaPautaAberto(!modalNovaPautaAberto);
    }
    return (
        <Flex justifyContent="center" alignItems="center" flexDirection="row" gap={16} h="100%" bg={'cinza.50'}>
            {admin ? (
                <>
                    <Botao onClick={mudarModalNovaPautaAberto} tamanho={'lg'} texto={"Ver pautas criadas"} />
                    <Botao onClick={()=>{}} tamanho={'lg'} texto={"Criar nova pauta"} />
                </>
            ) :
                <>
                    <Botao onClick={()=>{}} tamanho={'lg'} texto={"Sessões de votação abertas"} />
                    <Botao onClick={()=>{}} tamanho={'lg'} texto={"Sessões que votei"} />
                </>
            }

            <ModalNovaPauta aberto={modalNovaPautaAberto} fechar={mudarModalNovaPautaAberto} />
        </Flex>
    );
};

export default PaginaInicial;
