import { BrowserRouter } from "react-router-dom"
import Cabecalho from "../../../../pages/components/cabecalho/Cabecalho"
import { render, screen, waitFor } from "@testing-library/react"
import { ChakraProvider } from "@chakra-ui/react"
import tema from "../../../../temas/temas"
import { useTokenLocalStorageMock } from "../../../__mocks__/useTokenLocalStorageMock"
import { useNavigateMock } from "../../../__mocks__/useNavigateMock"
import { useDadosUsuarioStoreMock } from "../../../__mocks__/useDadosUsuarioStoreMock"
describe("Testando componente de cabeçalho", () => {
    const { useDadosUsuarioAdminPauta, useDadosUsuarioNaoAdminPauta } = useDadosUsuarioStoreMock();
    const removerTokenMock = jest.fn();
    const navigateMock = jest.fn();
    const windowReloadMock = jest.fn();

    Object.defineProperty(window, "location", {
        value: {
            reload: windowReloadMock,
        },
    });

    const renderizarComponente = (mockDadosUsuario: ()=>void)=>{
        mockDadosUsuario();
        render(
            <BrowserRouter>
                <ChakraProvider theme={tema}>
                    <Cabecalho />
                </ChakraProvider>
            </BrowserRouter>
        )
    }
    beforeEach(() => {
        removerTokenMock.mockClear();
        navigateMock.mockClear();
        useTokenLocalStorageMock(jest.fn(), jest.fn(), removerTokenMock);
        useNavigateMock(navigateMock);
    })

    it("Deve renderizar elementos do cabeçalho, para o usuário admin, corretamente", () => {
        renderizarComponente(useDadosUsuarioAdminPauta)
        const logoCabecalho = screen.getByTestId("logo-cabecalho");
        const explorar = screen.getByTestId("nav-explorar");
        const novoUsuario = screen.getByTestId("nav-novo-usuario");
        const minhasPautas = screen.getByTestId("nav-minhas-pautas");
        const logout = screen.getByTestId("nav-logout");

        expect(logoCabecalho).toBeDefined();
        expect(explorar).toBeDefined();
        expect(novoUsuario).toBeDefined();
        expect(minhasPautas).toBeDefined();
        expect(logout).toBeDefined();
    })
    it("Deve renderizar elementos do cabeçalho, para usuário não admin, corretamente", () => {
        renderizarComponente(useDadosUsuarioNaoAdminPauta)
        const logoCabecalho = screen.getByTestId("logo-cabecalho");
        const explorar = screen.getByTestId("nav-explorar");
        const novoUsuario = screen.queryByTestId("nav-novo-usuario");
        const minhasPautas = screen.queryByTestId("nav-minhas-pautas");
        const logout = screen.queryByTestId("nav-logout");
        expect(logoCabecalho).toBeDefined();
        expect(explorar).toBeDefined();
        expect(novoUsuario).toBeNull();
        expect(minhasPautas).toBeNull();
        expect(logout).toBeDefined();
    })

    it("Como admin, deve navegar corretamente para pagina de cadastro ao clicar em Novo Usuário", async () => {
        renderizarComponente(useDadosUsuarioAdminPauta);
        const novoUsuario = screen.getByTestId("nav-novo-usuario");
        await waitFor(()=> novoUsuario.click())
        expect(navigateMock).toHaveBeenCalledTimes(1);
    })
    it("Como admin, deve navegar corretamente para pagina /minhasPautas ao clicar em Minhas Pautas", async () => {
        renderizarComponente(useDadosUsuarioAdminPauta);
        const minhasPautas = screen.getByTestId("nav-minhas-pautas");
        await waitFor(()=> minhasPautas.click())
        expect(navigateMock).toHaveBeenCalledTimes(1);
    })
    it("Deve navegar corretamente para pagina /explorar ao clicar em Explorar", async () => {
        renderizarComponente(useDadosUsuarioAdminPauta);
        const explorar = screen.getByTestId("nav-explorar");
        await waitFor(()=> explorar.click())
        expect(navigateMock).toHaveBeenCalledTimes(1);
    })
    it("Deve sair da aplicação ao clicar em Sair", async () => {
        renderizarComponente(useDadosUsuarioAdminPauta);
        const logout = screen.getByTestId("nav-logout");
        await waitFor(()=> logout.click())
        expect(removerTokenMock).toHaveBeenCalledTimes(1);
        expect(windowReloadMock).toHaveBeenCalledTimes(1);
    })
})