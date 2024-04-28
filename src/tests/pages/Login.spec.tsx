import { ChakraProvider } from "@chakra-ui/react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import tema from "../../temas/temas"
import Login from "../../pages/login/Login"
import { BrowserRouter } from "react-router-dom"
import * as router from 'react-router'
import userEvent from "@testing-library/user-event"
import * as loginService from '../../services/loginUsuario.service';
import * as useLoginUsuario from '../../hooks/useLoginUsuario';


describe("Testando pagina de login", () => {
    const autenticacaoRespostaDados: AutenticacaoRespostaDados = {
        admin: false,
        token: "tokenValido"
    }

    const EMAIL_TESTID: string = "input-email";
    const SENHA_TESTID: string = "input-senha";
    const BOTAO_TESTID: string = "botao-login";
    const EMAIL_VALIDO: string = 'test@example.com';
    const SENHA_VALIDA: string = 'password123';

    const efeturarLogin = async (email: string, senha: string) => {
        const emailInput = screen.getByTestId(EMAIL_TESTID);
        const senhaInput = screen.getByTestId(SENHA_TESTID);
        const botao = screen.getByTestId(BOTAO_TESTID);

        fireEvent.change(emailInput, { target: { value: email } });
        fireEvent.change(senhaInput, { target: { value: senha } });

        await userEvent.click(botao);
    }
    const navigateMock = jest.fn();
    const mockLoginUsuario = jest.fn().mockResolvedValue(autenticacaoRespostaDados);


    beforeEach(() => {

        jest.spyOn(loginService, 'loginUsuarioService').mockResolvedValue(autenticacaoRespostaDados);
        jest.spyOn(useLoginUsuario, 'useLoginUsuario').mockReturnValue({
            loginUsuario: mockLoginUsuario
        });
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigateMock)

        render(
            <BrowserRouter>
                <ChakraProvider theme={tema}>
                    <Login />
                </ChakraProvider>
            </BrowserRouter>
        );
    })

    it("Deve encontrar input de email", () => {

        const emailInput = screen.getByTestId(EMAIL_TESTID);

        expect(emailInput).toBeDefined();
    })
    it("Deve encontrar input de senha", () => {

        const senhaInput = screen.getByTestId(SENHA_TESTID);

        expect(senhaInput).toBeDefined();
    })
    it("Deve encontrar botão para enviar dados de login", () => {

        const botao = screen.getByTestId(BOTAO_TESTID);

        expect(botao).toBeDefined();
    })

    it("Deve enviar dados corretos para LoginUsuario", async () => {
        await efeturarLogin(EMAIL_VALIDO, SENHA_VALIDA);
        await waitFor(() => expect(mockLoginUsuario).toHaveBeenCalledWith(EMAIL_VALIDO, SENHA_VALIDA))
    })
    it("Deve definir token ao realizar login", async () => {
        await efeturarLogin(EMAIL_VALIDO, SENHA_VALIDA);
        await waitFor(() => expect(localStorage.getItem('VOTACAO_TOKEN')).toBe(autenticacaoRespostaDados.token))
    })
    it("Deve navegar para explorar ao realizar login", async () => {
        await efeturarLogin(EMAIL_VALIDO, SENHA_VALIDA);
        await waitFor(() => expect(navigateMock).toHaveBeenCalledWith("/explorar"))
    })

    it("Deve exibir toast de erro ao enviar senha com menos de 8 caracteres ao tentar efetuar login", async () => {
        await efeturarLogin(EMAIL_VALIDO, "1234567");
        const toastErro = screen.getByText("Senha deve conter no mínimo 8 caracteres.");
        await waitFor(() => expect(toastErro).toBeDefined())
    })

})

