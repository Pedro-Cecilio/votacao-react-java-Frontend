import { FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { z } from "zod";
import useToastPersonalizado from "../../../hooks/useToastPersonalizado";
import { useState } from "react";
import Botao from "../botao/Botao";
import { useTokenLocalStorage } from "../../../hooks/useTokenLocalStorage";
import { useDadosAbrirVotacaoStore } from "../../../hooks/useDadosAbrirVotacaoStore";
import { useAbrirSessaoVotacao } from "../../../hooks/useAbrirSessaoVotacao";

interface ModalProps {
    aberto: boolean;
    fechar: () => void;
}
const ModalIniciarVotacaoAberto = ({ aberto, fechar }: ModalProps) => {
    const { toastErro } = useToastPersonalizado();
    const [isLoading, setIsLoading] = useState(false);
    const { obterTokenDoLocalStorage } = useTokenLocalStorage();
    const {pautaId, setPautaId} = useDadosAbrirVotacaoStore();
    const {abrirSessaoVotacao} = useAbrirSessaoVotacao();

    const inputSchema = z.object({
        minutos: z.number().int("O tempo deve ser informado em minutos.")
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
        setPautaId(0);
        reset();
        fechar();
    }

    const onSubmit = async ({ minutos }: inputs) => {
        try {
            const dados:AbrirSessaoVotacaoDados = {
                minutos, 
                pautaId
            }
            const token = obterTokenDoLocalStorage() ?? "";
            await abrirSessaoVotacao(token, dados);
            window.location.reload()
            fecharModal();

        } catch (error) {
            const axiosError = error as AxiosError<RespostaErro>;
            if (axiosError.code == "ERR_NETWORK") {
                toastErro("Erro ao conectar com servidor.");
                setIsLoading(false);
                return;
            }
            const mensagem: string = axiosError.response!.data.erro;
            toastErro(mensagem);
        }
        setIsLoading(false);

    }

    const onError: SubmitErrorHandler<inputs> = (errors) => {
        for (const [_, valor] of Object.entries(errors)) {
            if (valor) {
                toastErro(valor.message!);
                break;
            }
        }
        setIsLoading(false);
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
                            <NumberInputField {...register("minutos", {valueAsNumber:true})}/>
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