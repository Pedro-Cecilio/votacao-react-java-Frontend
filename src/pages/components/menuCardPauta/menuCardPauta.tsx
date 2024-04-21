import { AddIcon, HamburgerIcon, InfoOutlineIcon, LinkIcon } from "@chakra-ui/icons";
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import ModalIniciarVotacaoAberto from "../modalIniciarVotacao/ModalIniciarVotacao";
import { useState } from "react";
import { useDadosAbrirVotacaoStore } from "../../../hooks/useDadosAbrirVotacaoStore";
import { SessaoVotacaoResposta } from "../../../models/sessaoVotacaoModels";
import { useLocation, useNavigate } from "react-router-dom";
import useToastPersonalizado from "../../../hooks/useToastPersonalizado";

interface MenuAbrirVotacaoProps {
    pautaId: number;
    sessaoVotacao: SessaoVotacaoResposta | null
}
const MenuCardPauta = ({ pautaId, sessaoVotacao }: MenuAbrirVotacaoProps) => {
    const [modalIniciarVotacaoAberto, setModalIniciarVotacaoAberto] = useState<boolean>(false);
    const { setPautaId } = useDadosAbrirVotacaoStore()
    const { toastInfo } = useToastPersonalizado()
    const navigate = useNavigate();

    const fechar = () => {
        setModalIniciarVotacaoAberto(false);
    }
    const abrir = () => {
        setPautaId(pautaId);
        setModalIniciarVotacaoAberto(true);
    }
    const compartilhar = async () => {
        const protocol = window.location.protocol;
        const hostname = window.location.hostname;
        const port = window.location.port;
        const baseUrl = `${protocol}//${hostname}:${port}`;
        const urlVotoExterno = `${baseUrl}/votar/${pautaId}`
        navigator.clipboard.writeText(urlVotoExterno)
        toastInfo("Link copiado para área de transferência")
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
                    <MenuItem icon={<LinkIcon />} onClick={compartilhar}>
                        Compartilhar
                    </MenuItem>
                }
                {
                    sessaoVotacao &&
                    <MenuItem icon={<InfoOutlineIcon />} onClick={() => navigate(`/detalhes/${pautaId}`)}>
                        Detalhes
                    </MenuItem>
                }
            </MenuList>
            <ModalIniciarVotacaoAberto aberto={modalIniciarVotacaoAberto} fechar={fechar} />

        </Menu>
    )
}

export default MenuCardPauta;