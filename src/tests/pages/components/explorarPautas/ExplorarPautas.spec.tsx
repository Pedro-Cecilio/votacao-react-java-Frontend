import { act } from "react-dom/test-utils";
import { listaDeRespostaPautaDados } from "../../../__mocks__/models/listaDeRespostaPautaDados";
import { useDadosUsuarioStoreMock } from "../../../__mocks__/useDadosUsuarioStoreMock";
import { useInserirVotoMock } from "../../../__mocks__/useInserirVotoMock";
import { useTokenLocalStorageMock } from "../../../__mocks__/useTokenLocalStorageMock";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import tema from "../../../../theme/temas";
import ExplorarPautas from "../../../../pages/components/explorarPautas/ExplorarPautas";



describe("Testando componente de ExplorarPautas", () => {
    const {useDadosUsuarioAdminPauta} = useDadosUsuarioStoreMock();
    const listaDePautas = listaDeRespostaPautaDados();
    const metodoBuscarPautaBancoMock = jest.fn().mockResolvedValue(listaDePautas);
    const obterTokenMock = jest.fn();
    const inserirVotoInternoMock = jest.fn();


    beforeEach(async () => {

        await act(async () => {
            useTokenLocalStorageMock(obterTokenMock, jest.fn(), jest.fn());
            useDadosUsuarioAdminPauta()
            useInserirVotoMock(inserirVotoInternoMock, jest.fn());
            render(
                <BrowserRouter >
                    <ChakraProvider theme={tema}>
                        <ExplorarPautas metodoBuscarPautasBanco={metodoBuscarPautaBancoMock} />
                    </ChakraProvider>
                </BrowserRouter>
            )
        })
    })

    it("Deve verificar se está listando as pautas", () => {
        const cardPauta = screen.getAllByTestId("card-pauta");
        expect(cardPauta.length).toBe(listaDePautas.length);
    })
    
    it("Deve verificar se componente filtro está presente", () => {
        const filtro = screen.getByTestId("filtro");
        expect(filtro).toBeDefined();
    })
})