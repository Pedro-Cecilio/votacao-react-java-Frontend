import { Flex, Image, Link as ChakraLink, Menu, MenuButton, MenuList, IconButton, MenuItem, useBreakpointValue  } from "@chakra-ui/react"
import logo from "../../../assets/logo.svg"
import { Link as ReactRouterLink, useNavigate } from "react-router-dom"
import { useDadosUsuarioStore } from "../../../hooks/useDadosUsuarioStore"
import { AddIcon, HamburgerIcon, Search2Icon, SunIcon, WarningIcon } from "@chakra-ui/icons";
import { useTokenLocalStorage } from "../../../hooks/useTokenLocalStorage";

const Cabecalho = () => {
    const { admin } = useDadosUsuarioStore()
    const mostrarMenuBurger = useBreakpointValue({ base: true, md: false });
    const navigate = useNavigate();
    const {removerTokenDoLocalStorage} = useTokenLocalStorage();
    const logout = ()=>{
        removerTokenDoLocalStorage();
        window.location.reload()
    }
    return (
        <Flex as="header" bg={'cinza.700'} p={3} justifyContent={"space-between"} alignItems={"center"} textColor={"branco"}>
            <Image src={logo} w='50px' />
            {mostrarMenuBurger ? (
                <Menu>
                    <MenuButton
                        color={"branco"}
                        as={IconButton}
                        aria-label='Options'
                        icon={<HamburgerIcon />}
                        _hover={{ backgroundColor: "branco", color: "preto" }}
                        _active={{ backgroundColor: "branco", color: "preto" }}
                        variant='outline'
                    />
                    <MenuList bg={"cinza.700"} >

                        <MenuItem icon={<Search2Icon />} bg={"cinza.700"} _hover={{ backgroundColor: "branco", color: "preto" }} fontWeight={"bold"} p={4} onClick={() => { navigate("/explorar") }}>
                            Explorar
                        </MenuItem>

                        {admin &&
                            <>
                                <MenuItem icon={<AddIcon />} bg={"cinza.700"} _hover={{ backgroundColor: "branco", color: "preto" }} fontWeight={"bold"} p={4} onClick={() => { navigate("/cadastro") }}>
                                    Novo usuário
                                </MenuItem>
                                <MenuItem icon={<SunIcon />} bg={"cinza.700"} _hover={{ backgroundColor: "branco", color: "preto" }} fontWeight={"bold"} p={4} onClick={() => { navigate("/minhasPautas") }}>
                                    Minhas pautas
                                </MenuItem>
                            </>

                        }
                        <MenuItem icon={<WarningIcon />} bg={"cinza.700"} _hover={{ backgroundColor: "branco", color: "preto" }} fontWeight={"bold"} p={4} onClick={logout}>
                            Sair
                        </MenuItem>
                    </MenuList>
                </Menu>

            )
                :

                <Flex gap={6}>
                    <ChakraLink as={ReactRouterLink} to={"/explorar"} fontWeight={"bold"} m={1}>Explorar</ChakraLink >
                    {admin &&
                        <>
                            <ChakraLink as={ReactRouterLink} to={"/cadastro"} fontWeight={"bold"} m={1}>Novo usuário</ChakraLink >
                            <ChakraLink as={ReactRouterLink} to={"/minhasPautas"} fontWeight={"bold"} m={1}>Minhas pautas</ChakraLink >
                        </>

                    }
                    <ChakraLink as={ReactRouterLink}  fontWeight={"bold"} m={1} onClick={logout}>Sair</ChakraLink >
                </Flex>

            }
        </Flex >
    )

}

export default Cabecalho;

