import { Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import useToastPersonalizado from "../../hooks/useToastPersonalizado";
import { useEffect, useState } from "react";
import { z } from "zod";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useTokenLocalStorage } from "../../hooks/useTokenLocalStorage";
import { loginUsuarioService } from "../../services/loginUsuario.service";


const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { toastErro } = useToastPersonalizado();
    const { inserirTokenNoLocalStorage } = useTokenLocalStorage()
    const navigate = useNavigate();

    const inputSchema = z.object({
        email: z.string().email("Email deve ter formato válido."),
        senha: z.string().min(8, "Senha deve conter no mínimo 8 caracteres."),
    })

    type inputs = z.infer<typeof inputSchema>

    const {
        register,
        handleSubmit,
    } = useForm<inputs>({
        resolver: zodResolver(inputSchema)
    })

    const onSubmit = async ({ email, senha }: inputs) => {
        try {
            setIsLoading(true);
            const authReposta = await loginUsuarioService(email, senha);
            inserirTokenNoLocalStorage(authReposta.token);
            navigate("/explorar")
        } catch (error) {
            const axiosError = error as AxiosError<RespostaErro>;
            if (axiosError.code == "ERR_NETWORK") {
                toastErro("Erro ao conectar com servidor.")
                setIsLoading(false)
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

    

    useEffect(() => {
        const handleTeclaPressionada = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                handleSubmit(onSubmit, onError)();
            }
        };

        window.addEventListener("keydown", handleTeclaPressionada);

        return () => {
            window.removeEventListener("keydown", handleTeclaPressionada);
        };
    }, [handleSubmit, onError]);

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

            <FormControl
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                px={4}
            >
                <InputGroup
                    gap={2}
                    display={'flex'}
                    flexDirection={'column'}
                    maxWidth={450}
                    minWidth={300}
                >
                    <FormLabel>Email</FormLabel>
                    <Input type='email'  {...register('email')} data-testid="input-email" _focus={{ boxShadow: "none", borderColor: "cinza.400" }} />
                    <FormLabel>Senha</FormLabel>
                    <Input type='password' {...register('senha')} data-testid="input-senha" _focus={{ boxShadow: "none", borderColor: "cinza.400" }} />
                </InputGroup>
            </FormControl>
            <Button
                data-testid="botao-login"
                isLoading={isLoading}
                onClick={handleSubmit(onSubmit, onError)}
                my={8}
                maxWidth={300}
                minWidth={200}
                type="submit"
                colorScheme='gray'>
                Enviar
            </Button>
        </Flex>

    );
}

export default Login;