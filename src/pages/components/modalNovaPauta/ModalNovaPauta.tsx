import { FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { z } from "zod";
import useToastPersonalizado from "../../../hooks/useToastPersonalizado";
import { useEffect, useState } from "react";
import Botao from "../botao/Botao";
import { Categoria } from "../../../enums/categoria";
import { useTokenLocalStorage } from "../../../hooks/useTokenLocalStorage";
import { criarPautaService } from "../../../services/pauta.service";
import { tratamentoErroAxios } from "../../../utils/utils";

interface ModalProps {
    aberto: boolean;
    fechar: () => void;
    setAtualizarPagina: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalNovaPauta = ({ aberto, fechar, setAtualizarPagina }: ModalProps) => {
    const { toastErro, toastSucesso } = useToastPersonalizado()
    const [isLoading, setIsLoading] = useState(false)
    const { obterTokenDoLocalStorage } = useTokenLocalStorage()

    useEffect(() => {
        if (!aberto) {
            setAtualizarPagina(false);
        }
    }, [aberto, setAtualizarPagina]);

  
    const inputSchema = z.object({
        assunto: z.string().min(1, "Assunto deve ser informado."),
        categoria: z.string().min(1, "Categoria deve ser informada."),
    })
    type inputs = z.infer<typeof inputSchema>
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<inputs>({
        resolver: zodResolver(inputSchema)
    })

    const fecharModal = () => {
        reset();
        fechar();
    }

    const onSubmit = async ({ assunto, categoria }: inputs) => {
        try {
            const token = obterTokenDoLocalStorage() ?? "";
            await criarPautaService(assunto, categoria, token);
            setAtualizarPagina(true)
            toastSucesso("Pauta criada com sucesso!")
            fecharModal(); 
        } catch (error) {
            setIsLoading(false)
            const axiosError = error as AxiosError<RespostaErro>;
            tratamentoErroAxios({axiosError, toastErro})
        }
        setIsLoading(false)

    }

    const onError: SubmitErrorHandler<inputs> = (errors) => {
        for (const [_, valor] of Object.entries(errors)) {
            if (valor) {
                toastErro(valor.message!)
                break;
            }
        }
        setIsLoading(false)
    };
    return (
        <Modal isOpen={aberto} onClose={fecharModal} size={"sm"}>
            <ModalOverlay />
            <ModalContent display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} data-testid={"modal-nova-pauta"}>
                <ModalHeader>Criar Pauta</ModalHeader>
                <ModalCloseButton data-testid="fechar-modal-abrir-pauta"/>
                <ModalBody w={"100%"}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                >
                    <FormControl>
                        <FormLabel>Assunto:</FormLabel>
                        <Input type='text' {...register('assunto')} data-testid="input-assunto" _focus={{ boxShadow: "none", borderColor: "cinza.400" }} />
                        <FormLabel>Categoria:</FormLabel>
                        <Select {...register("categoria")} placeholder="Categorias" data-testid="select-categoria">
                            {Object.values(Categoria).map((categoria) => (
                                <option key={categoria} value={categoria}>
                                    {categoria}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Botao
                        testid="botao-criar-pauta"
                        isLoading={isLoading}
                        onClick={handleSubmit(onSubmit, onError)}
                        tamanho={"md"}
                        texto={"Criar"}
                    />
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalNovaPauta;