import { act } from "react-dom/test-utils";
import { listaDeRespostaPautaDados } from "../../../__mocks__/models/listaDeRespostaPautaDados";
import { useDadosUsuarioStoreMock } from "../../../__mocks__/useDadosUsuarioStoreMock";
import { useInserirVotoMock } from "../../../__mocks__/useInserirVotoMock";
import { useTokenLocalStorageMock } from "../../../__mocks__/useTokenLocalStorageMock";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import tema from "../../../../temas/temas";
import ExplorarPautas from "../../../../pages/components/explorarPautas/ExplorarPautas";



describe("Testando componente de ExplorarPautas", () => {
    const listaDePautas = listaDeRespostaPautaDados();
    const metodoBuscarPautaBancoMock = jest.fn().mockResolvedValue(listaDePautas);
    const obterTokenMock = jest.fn();
    const inserirVotoInternoMock = jest.fn();


    beforeEach(async () => {

        await act(async () => {
            useTokenLocalStorageMock(obterTokenMock);
            useDadosUsuarioStoreMock(true);
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
        listaDePautas.forEach((pauta) => {
            const cardPauta = screen.getByTestId(pauta.id);
            expect(cardPauta).toBeDefined();
        })
    })

    it("Deve verificar se o conteúdo das pautas está sendo apresentado na tela", () => {
        listaDePautas.forEach((pauta) => {
            const nomeUsuario = screen.getByTestId(`usuario-nome-${pauta.id}`);
            const categoria = screen.getByTestId(`categoria-${pauta.id}`);
            const assunto = screen.getByTestId(`assunto-${pauta.id}`);

            expect(nomeUsuario.textContent).toContain(`${pauta.usuario.nome} ${pauta.usuario.sobrenome}`);
            expect(categoria.textContent).toContain(pauta.categoria);
            expect(assunto.textContent).toContain(pauta.assunto);
        })
    })
    it("Deve verificar se componente filtro está presente", () => {
        const filtro = screen.getByTestId("filtro");
        expect(filtro).toBeDefined();
    })
})