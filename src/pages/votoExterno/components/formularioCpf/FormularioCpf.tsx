import { Button, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitErrorHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { useVerificarSeUsuarioExistePorCpf } from "../../../../hooks/useVerificarSeUsuarioExistePorCpf"
import useToastPersonalizado from "../../../../hooks/useToastPersonalizado"

interface FormularioCpfProps {
    setUsuarioExiste: (usuarioExiste: boolean) => void;
    setCpf: (cpf: string) => void;
    isLoading: boolean;
    setIsloading: (isLoading: boolean) => void;
}


const FormularioCpf = ({ setUsuarioExiste, setCpf, isLoading, setIsloading }: FormularioCpfProps) => {
    const { verificarSeUsuarioExistePorCpf } = useVerificarSeUsuarioExistePorCpf();
    const { toastErro} = useToastPersonalizado();

    const inputSchema = z.object({
        cpf: z.string().length(11, "Cpf deve ter exatamente 11 caracteres.")
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
        const resposta = await verificarSeUsuarioExistePorCpf(cpf)
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
            >
                <FormLabel>Cpf:</FormLabel>
                <Input type='text' {...register('cpf')} data-testid="input-cpf" borderColor={"cinza.400"} _focus={{ boxShadow: "none", borderColor: "cinza.100" }} />
                <Button
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