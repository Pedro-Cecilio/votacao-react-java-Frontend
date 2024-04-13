import { Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import useToastPersonalizado from "../../hooks/useToastPersonalizado";
import { useState } from "react";
import { z } from "zod";
import { AxiosError } from "axios";

const inputSchema = z.object({
    email: z.string().email("Email deve ter formato válido."),
    senha: z.string().min(8, "Senha deve conter no mínimo 8 caracteres."),
})

type inputs = z.infer<typeof inputSchema>
const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { toastErro } = useToastPersonalizado();

    const {
        register,
        handleSubmit,
    } = useForm<inputs>({
        resolver: zodResolver(inputSchema)
    })

    const onSubmit = async ({ email, senha }: inputs) => {
        try {
            setIsLoading(true)
            console.log(email)
            console.log(senha)
        } catch (error) {
            const axiosError = error as AxiosError<RespostaErro>;
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
    };
    return (
        <Flex
            gap={12}
            backgroundColor={'cinza.700'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            textColor={'branco'}
            minH='100vh'
        >
            <Heading as={'h1'} size={'xl'}>Login</Heading>
            <form
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                <FormControl
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                >
                    <InputGroup
                        gap={2}
                        display={'flex'}
                        flexDirection={'column'}
                        maxWidth={500}
                        minWidth={300}
                    >
                        <FormLabel>Email</FormLabel>
                        <Input type='email'  {...register('email')} data-testid="input-email" _focus={{ boxShadow: "none", borderColor: "cinza.400" }} />
                        <FormLabel>Senha</FormLabel>
                        <Input type='password' {...register('senha')} data-testid="input-senha" _focus={{ boxShadow: "none", borderColor: "cinza.400" }} />
                    </InputGroup>
                </FormControl>
                <Button
                    isLoading={isLoading}
                    my={8}
                    maxWidth={300}
                    minWidth={200}
                    type="submit"
                    colorScheme='gray'>
                    Enviar
                </Button>
            </form>
        </Flex>

    );
}

export default Login;