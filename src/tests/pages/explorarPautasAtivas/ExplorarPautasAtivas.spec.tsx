import { act } from "react-dom/test-utils";
import { useTokenLocalStorageMock } from "../../__mocks__/useTokenLocalStorageMock";
import { useDadosUsuarioStoreMock } from "../../__mocks__/useDadosUsuarioStoreMock";
import { useInserirVotoMock } from "../../__mocks__/useInserirVotoMock";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import tema from "../../../temas/temas";
import ExplorarPautasAtivas from "../../../pages/explorarPautasAtivas/ExplorarPautasAtivas";
import { useBuscarTodasPautasAtivasMock } from "../../__mocks__/useBuscarTodasPautasAtivasMock";


describe("Testando página de explorar pautas ativas", () => {
    const {useDadosUsuarioNaoAdminPauta} = useDadosUsuarioStoreMock();
    const obterTokenMock = jest.fn();
    const inserirVotoInternoMock = jest.fn();
    const buscarTodasPautasAtivasMock = jest.fn();
    beforeEach(async () => {
        await act(async () => {
            useDadosUsuarioNaoAdminPauta()
            useBuscarTodasPautasAtivasMock(buscarTodasPautasAtivasMock)
            useTokenLocalStorageMock(obterTokenMock, jest.fn(), jest.fn());
            useInserirVotoMock(inserirVotoInternoMock, jest.fn());
            render(
                <BrowserRouter >
                    <ChakraProvider theme={tema}>
                        <ExplorarPautasAtivas />
                    </ChakraProvider>
                </BrowserRouter>
            )
        })
    })

    it("Deve buscar todas pautas ativas", async () => {
        await waitFor(() => expect(buscarTodasPautasAtivasMock).toHaveBeenCalledTimes(1));
    })

    it("Deve renderizar componente ExplorarPautas", () => {
        const explorarPautas = screen.getByTestId("explorar-pautas");
        expect(explorarPautas).toBeDefined();
    })

    it("Não deve renderizar botão para abrir nova pauta", () => {
        const botaoAbrirModalNovaPauta = screen.queryByTestId("botao-abrirModalNovaPauta");
        expect(botaoAbrirModalNovaPauta).toBeNull();
    })
})