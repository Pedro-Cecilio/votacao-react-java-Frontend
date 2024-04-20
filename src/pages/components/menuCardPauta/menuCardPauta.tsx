import { AddIcon, HamburgerIcon, InfoOutlineIcon, LinkIcon } from "@chakra-ui/icons";
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import ModalIniciarVotacaoAberto from "../modalIniciarVotacao/ModalIniciarVotacao";
import { useState } from "react";
import { useDadosAbrirVotacaoStore } from "../../../hooks/useDadosAbrirVotacaoStore";
import { SessaoVotacaoResposta } from "../../../models/sessaoVotacaoModels";

interface MenuAbrirVotacaoProps {
    pautaId: number;
    sessaoVotacao: SessaoVotacaoResposta | null
}
const menuCardPauta = ({ pautaId, sessaoVotacao }: MenuAbrirVotacaoProps) => {
    const [modalIniciarVotacaoAberto, setModalIniciarVotacaoAberto] = useState<boolean>(false);
    const { setPautaId } = useDadosAbrirVotacaoStore()
    const fechar = () => {
        setModalIniciarVotacaoAberto(false);
    }
    const abrir = () => {
        setPautaId(pautaId);
        setModalIniciarVotacaoAberto(true);
    }
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                _hover={{ backgroundColor: "cinza.300", color: "white" }}
                variant='outline'
            />
            <MenuList>
                {
                    sessaoVotacao == null &&
                    <MenuItem icon={<AddIcon />} onClick={abrir}>
                        Abrir Votação
                    </MenuItem>
                }
                {
                    sessaoVotacao?.sessaoAtiva &&
                    <MenuItem icon={<LinkIcon />} onClick={() => { }}>
                        Compartilhar
                    </MenuItem>
                }
                {
                    !sessaoVotacao?.sessaoAtiva &&
                    <MenuItem icon={<InfoOutlineIcon />} onClick={() => { }}>
                        Detalhes
                    </MenuItem>
                }
            </MenuList>
            <ModalIniciarVotacaoAberto aberto={modalIniciarVotacaoAberto} fechar={fechar} />

        </Menu>
    )
}

export default menuCardPauta;