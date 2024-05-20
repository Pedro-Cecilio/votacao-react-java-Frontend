import { ChakraProvider } from "@chakra-ui/react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import tema from "../../../temas/temas"
import Login from "../../../pages/login/Login"
import { BrowserRouter } from "react-router-dom"
import { useNavigateMock } from "../../__mocks__/useNavigateMock"
import { act } from "react-dom/test-utils"
import { loginMocks } from "../../__mocks__/loginMocks"
import * as loginService from '../../../services/auth.service'


describe("Testando pagina de login", () => {

    const { loginServiceMock, autenticacaoRespostaDados } = loginMocks()
    const EMAIL_TESTID: string = "input-email";
    const SENHA_TESTID: string = "input-senha";
    const BOTAO_TESTID: string = "botao-login";
    const EMAIL_VALIDO: string = 'test@example.com';
    const SENHA_VALIDA: string = 'password123';

    const efeturarLogin = (email: string, senha: string) => {
        act(() => {
            const emailInput = screen.getByTestId(EMAIL_TESTID);
            const senhaInput = screen.getByTestId(SENHA_TESTID);
            const botao = screen.getByTestId(BOTAO_TESTID);
            fireEvent.change(emailInput, { target: { value: email } });
            fireEvent.change(senhaInput, { target: { value: senha } });

            fireEvent.click(botao);
        })
    }
    const navigateMock = jest.fn();

    beforeEach(() => {

        loginServiceMock();
        useNavigateMock(navigateMock)

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
        efeturarLogin(EMAIL_VALIDO, SENHA_VALIDA);
        await waitFor(() => expect(loginService.loginService).toHaveBeenCalledWith(EMAIL_VALIDO, SENHA_VALIDA))
    })
    it("Deve definir token ao realizar login", async () => {
        efeturarLogin(EMAIL_VALIDO, SENHA_VALIDA);
        await waitFor(() => expect(localStorage.getItem('VOTACAO_TOKEN')).toBe(autenticacaoRespostaDados.token))
    })
    it("Deve navegar para explorar ao realizar login", async () => {
        efeturarLogin(EMAIL_VALIDO, SENHA_VALIDA);
        await waitFor(() => expect(navigateMock).toHaveBeenCalledWith("/explorar"))
    })

    it("Deve exibir toast de erro ao enviar senha com menos de 8 caracteres ao tentar efetuar login", async () => {
        efeturarLogin(EMAIL_VALIDO, "1234567");
        await waitFor(() => expect(screen.getByText("Senha deve conter no mínimo 8 caracteres.")).toBeDefined())
    })
    it("Deve exibir toast de erro ao enviar email inválido ao tentar efetuar login", async () => {
        efeturarLogin("emailInválido", SENHA_VALIDA);
        await waitFor(() => expect(screen.getByText("Email deve ter formato válido.")).toBeDefined())
    })

})

