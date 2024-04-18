import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import ModalIniciarVotacaoAberto from "../modalIniciarVotacao/ModalIniciarVotacao";
import { useState } from "react";

const MenuAbrirVotacao = () => {
    const [modalIniciarVotacaoAberto, setModalIniciarVotacaoAberto] = useState<boolean>(false);

    const mudarModalIniciarVotacaoAberto = () => {
        setModalIniciarVotacaoAberto(!modalIniciarVotacaoAberto);
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
                <MenuItem icon={<AddIcon />} onClick={mudarModalIniciarVotacaoAberto}>
                    Abrir Votação
                </MenuItem>
            </MenuList>
            <ModalIniciarVotacaoAberto aberto={modalIniciarVotacaoAberto} fechar={mudarModalIniciarVotacaoAberto}/>

        </Menu>
    )
}

export default MenuAbrirVotacao;