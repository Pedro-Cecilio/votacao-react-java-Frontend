import { SettingsIcon } from "@chakra-ui/icons"
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormControl, FormLabel, Select, Stack, useDisclosure } from "@chakra-ui/react"
import Botao from "../botao/Botao";
import { Categoria } from "../../../enums/categoria";
import { z } from "zod";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const inputSchema = z.object({
    categoria: z.string()
})
export type InputsFiltro = z.infer<typeof inputSchema>

interface FiltroProps{
    readonly onSubmit: (inputs:InputsFiltro)=>Promise<void>;
    readonly onError: SubmitErrorHandler<InputsFiltro> 
}
function Filtro({onSubmit, onError}:FiltroProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    
    const {
        register,
        handleSubmit,
    } = useForm<InputsFiltro>({
        resolver: zodResolver(inputSchema)
    })
    
    const enviarFormulario = async (inputs:InputsFiltro) => {
        await onSubmit(inputs);
        onClose();
    }
    return (
        <Box data-testid={"filtro"}>
            <Botao testid={"botao-filtro"} rightIcon={<SettingsIcon />} onClick={onOpen} tamanho={"sm"} texto="Filtro" />
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent data-testid={"drawer-filtro"}>
                    <DrawerCloseButton data-testid={"botao-fechar-filtro-topo"}/>
                    <DrawerHeader borderBottomWidth='1px' data-testid={"header-filtro"}>
                        Filtre as pautas
                    </DrawerHeader>

                    <DrawerBody>
                        <FormControl data-testid={"input-categoria-filtro"}>
                            <Stack spacing='24px'>
                                <Box>
                                    <FormLabel htmlFor='categoria'>Categoria</FormLabel>
                                    <Select {...register("categoria")} placeholder="Categorias" data-testid={"categorias-filtro"}>
                                        {Object.values(Categoria).map((categoria) => (
                                            <option key={categoria} value={categoria}>
                                                {categoria}
                                            </option>
                                        ))}
                                    </Select>
                                </Box>
                            </Stack>
                        </FormControl>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px'>
                        <Button variant='outline' mr={3} onClick={onClose} data-testid={"botao-fechar-filtro-footer"}>
                            Cancel
                        </Button>
                        <Botao testid={"botao-filtrar"} onClick={handleSubmit(enviarFormulario, onError)} tamanho={"md"} texto="Filtrar" />
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Box>
    )
}

export default Filtro;