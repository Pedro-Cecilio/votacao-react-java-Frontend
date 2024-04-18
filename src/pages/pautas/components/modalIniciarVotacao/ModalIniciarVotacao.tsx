import { Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { z } from "zod";
import useToastPersonalizado from "../../../../hooks/useToastPersonalizado";
import { useState } from "react";
import Botao from "../../../components/botao/Botao";
import { useTokenLocalStorage } from "../../../../hooks/useTokenLocalStorage";

interface ModalProps {
    aberto: boolean;
    fechar: () => void;
}
const ModalIniciarVotacaoAberto = ({ aberto, fechar }: ModalProps) => {
    const { toastErro, toastSucesso } = useToastPersonalizado()
    const [isLoading, setIsLoading] = useState(false)
    const { obterTokenDoLocalStorage } = useTokenLocalStorage()


    const inputSchema = z.object({
        tempo: z.number().int("O tempo deve ser informado em minutos.")
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

    const onSubmit = async ({ tempo }: inputs) => {
        try {
            const token = obterTokenDoLocalStorage() ?? "";
            console.log(tempo)

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
                <ModalHeader>Abrir votação da pauta</ModalHeader>
                <ModalCloseButton />
                <ModalBody w={"100%"}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                >
                    <FormControl>
                        <FormLabel>Tempo da votação em Minutos</FormLabel>
                        <NumberInput defaultValue={1} min={1}>
                            <NumberInputField {...register("tempo", {valueAsNumber:true})}/>
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Botao
                        isLoading={isLoading}
                        onClick={handleSubmit(onSubmit, onError)}
                        tamanho={"md"}
                        texto={"Abrir votação"}
                    />
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalIniciarVotacaoAberto;