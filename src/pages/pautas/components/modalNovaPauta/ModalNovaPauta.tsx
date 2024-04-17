import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { z } from "zod";
import useToastPersonalizado from "../../../../hooks/useToastPersonalizado";
import { useState } from "react";
import Botao from "../../../components/botao/Botao";
import { Categoria } from "../../../../enums/categoria";
import { useCriarPauta } from "../../../../hooks/useCriarPauta";
import { useTokenLocalStorage } from "../../../../hooks/useTokenLocalStorage";

interface ModalProps {
    aberto: boolean;
    fechar: () => void;
}
const ModalNovaPauta = ({ aberto, fechar }: ModalProps) => {
    const { toastErro, toastSucesso } = useToastPersonalizado()
    const [isLoading, setIsLoading] = useState(false)
    const { obterTokenDoLocalStorage } = useTokenLocalStorage()
    const { criarPauta } = useCriarPauta()

    const inputSchema = z.object({
        assunto: z.string().min(1, "Assunto deve ser informado."),
        categoria: z.nativeEnum(Categoria),
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
            await criarPauta(assunto, categoria, token);
            fecharModal();
            toastSucesso("Pauta criada com sucesso!")

        } catch (error) {
            const axiosError = error as AxiosError<RespostaErro>;
            if (axiosError.code == "ERR_NETWORK") {
                toastErro("Erro ao conectar com servidor.")
                setIsLoading(false)
                return;
            }
            const mensagem: string = axiosError.response!.data.erro;
            toastErro(mensagem)
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
            <ModalContent display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                <ModalHeader>Criar Pauta</ModalHeader>
                <ModalCloseButton />
                <ModalBody w={"100%"}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                >
                    <FormControl>
                        <FormLabel>Assunto:</FormLabel>
                        <Input type='text' {...register('assunto')} data-testid="input-assunto" _focus={{ boxShadow: "none", borderColor: "cinza.400" }} />
                        <FormLabel>Categoria:</FormLabel>
                        <Select {...register("categoria")} placeholder="Categorias">
                            {Object.values(Categoria).map((categoria) => (
                                <option key={categoria} value={categoria}>
                                    {categoria}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='red' mr={3} onClick={fecharModal}>
                        Fechar
                    </Button>
                    <Botao
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