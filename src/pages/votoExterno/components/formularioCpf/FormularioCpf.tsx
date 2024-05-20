import { Button, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitErrorHandler, useForm } from "react-hook-form"
import { z } from "zod"
import useToastPersonalizado from "../../../../hooks/useToastPersonalizado"
import { REGEX_CPF } from "../../../../regex/regex"
import { verificarSeUsuarioExistePorCpfService } from "../../../../services/verificarSeUsuarioExistePorCpf.service"

interface FormularioCpfProps {
    setUsuarioExiste: (usuarioExiste: boolean) => void;
    setCpf: (cpf: string) => void;
    isLoading: boolean;
    setIsloading: (isLoading: boolean) => void;
}


const FormularioCpf = ({ setUsuarioExiste, setCpf, isLoading, setIsloading }: FormularioCpfProps) => {
    const { toastErro } = useToastPersonalizado();

    const inputSchema = z.object({
        cpf: z.string().regex(REGEX_CPF, "Cpf deve conter 11 caracteres numéricos.")
    })

    type inputCpf = z.infer<typeof inputSchema>
    const {
        register,
        handleSubmit,
    } = useForm<inputCpf>({
        resolver: zodResolver(inputSchema)
    })

    const onSubmit = async ({ cpf }: inputCpf) => {
        setIsloading(true);
        const resposta = await verificarSeUsuarioExistePorCpfService(cpf)
        setUsuarioExiste(resposta.existe)
        setCpf(cpf)
        setIsloading(false);
    }

    const onError: SubmitErrorHandler<inputCpf> = (errors) => {
        for (const [_, valor] of Object.entries(errors)) {
            if (valor) {
                toastErro(valor.message!)
                break;
            }
        }
    };
    return (
        <>
            <Heading as={"h1"}>Insira seu Cpf</Heading>
            <FormControl
                color={"branco"}
                maxW={"300px"}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={"center"}
                data-testid={"formulario-cpf"}
            >
                <FormLabel>Cpf:</FormLabel>
                <Input type='text' {...register('cpf')} data-testid="input-cpf" borderColor={"cinza.400"} _focus={{ boxShadow: "none", borderColor: "cinza.100" }} />
                <Button
                    data-testid={"botao-enviar-cpf"}
                    onClick={handleSubmit(onSubmit, onError)}
                    isLoading={isLoading}
                    my={4}
                    maxWidth={300}
                    minWidth={200}
                    type="submit"
                    colorScheme='gray'>
                    Enviar
                </Button>
            </FormControl>
        </>

    )
}

export default FormularioCpf;