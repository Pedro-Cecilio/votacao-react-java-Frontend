import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { respostaPautaDadosMock } from "../../../__mocks__/models/respostaPautaDadosMocks";
import { useAbrirSessaoVotacaoMock } from "../../../__mocks__/useAbrirSessaoVotacaoMock";
import { useDadosAbrirVotacaoStoreMock } from "../../../__mocks__/useDadosAbrirVotacaoStoreMock";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import tema from "../../../../temas/temas";
import ModalIniciarVotacaoAberto from "../../../../pages/components/modalIniciarVotacao/ModalIniciarVotacao";
import { useTokenLocalStorageMock } from "../../../__mocks__/useTokenLocalStorageMock";

describe("Testando componente de ExplorarPautas com usuário não admin", () => {

    const setPautaIdMock = jest.fn();
    const abrirSessaoVotacaoMock = jest.fn()
    const fecharModalMock = jest.fn()
    const obterTokenMock = jest.fn()

    Object.defineProperty(window, "location", {
        value: {
            reload: jest.fn(),
        },
    });
    const renderizarComponente = (aberto: boolean) => {
        render(
            <BrowserRouter >
                <ChakraProvider theme={tema}>
                    <ModalIniciarVotacaoAberto aberto={aberto} fechar={fecharModalMock} />
                </ChakraProvider>
            </BrowserRouter>
        )
    }
    beforeEach(() => {
        obterTokenMock.mockClear();
        fecharModalMock.mockClear();

        useDadosAbrirVotacaoStoreMock(setPautaIdMock);
        useAbrirSessaoVotacaoMock(abrirSessaoVotacaoMock)
        useTokenLocalStorageMock(obterTokenMock, jest.fn(), jest.fn());

    })


    it("Deve verificar se elementos do modal foram renderizados ", async () => {
        renderizarComponente(true);
        const header = screen.queryByText("Abrir votação na pauta");
        const labelForm = screen.queryByText("Tempo da votação em minutos");
        const formularioAbrirSessaoVotacao = screen.queryByTestId("form-abrir-sessao-votacao");
        const inputMinutos = screen.queryByTestId("input-minutos-sessao-votacao");
        const botaoAbrirSessaoVotacao = screen.queryByTestId("botao-abrir-sessao-votacao");

        expect(header).toBeDefined();
        expect(labelForm).toBeDefined();
        expect(formularioAbrirSessaoVotacao).toBeDefined();
        expect(botaoAbrirSessaoVotacao).toBeDefined();
        expect(inputMinutos).toBeDefined();
    })
    it("Deve ser possível iniciar uma sessão de votação com tempo padrão", async () => {
        renderizarComponente(true);
        const botaoAbrirSessaoVotacao = screen.getByTestId("botao-abrir-sessao-votacao");
        const dados = {
            minutos: 1,
            pautaId: respostaPautaDadosMock().id
        }
        await waitFor(() => botaoAbrirSessaoVotacao.click());
        expect(obterTokenMock).toHaveBeenCalledTimes(1);
        expect(abrirSessaoVotacaoMock).toHaveBeenCalledWith(obterTokenMock(), dados);
        expect(fecharModalMock).toHaveBeenCalledTimes(1);
    })
    it("Deve ser possível iniciar uma sessão de votação com tempo informando um tempo em minutos", async () => {
        renderizarComponente(true);
        const botaoAbrirSessaoVotacao = screen.getByTestId("botao-abrir-sessao-votacao");
        const inputMinutos = screen.getByTestId("input-minutos-sessao-votacao");

        await waitFor(() => fireEvent.change(inputMinutos, { target: { value: 5 } }));
        await waitFor(() => botaoAbrirSessaoVotacao.click());

        const dados = {
            minutos: 5,
            pautaId: respostaPautaDadosMock().id
        }
        expect(obterTokenMock).toHaveBeenCalledTimes(1);
        expect(abrirSessaoVotacaoMock).toHaveBeenCalledWith(obterTokenMock(), dados);
        expect(fecharModalMock).toHaveBeenCalledTimes(1);
    })

    it("Deve falhar ao tentar inserir nos minutos um valor que não seja um número inteiro", async () => {
        renderizarComponente(true);
        const botaoAbrirSessaoVotacao = screen.getByTestId("botao-abrir-sessao-votacao");
        const inputMinutos = screen.getByTestId("input-minutos-sessao-votacao");
        const toastErro = screen.queryByText("O tempo deve ser informado em minutos.")

        await waitFor(() => fireEvent.change(inputMinutos, { target: { value: 5.7 } }));
        await waitFor(() => botaoAbrirSessaoVotacao.click());
        await waitFor(() => expect(toastErro).toBeDefined());
    })
    it("Não deve renderizar modal quando aberto for false", async () => {
        renderizarComponente(false);
        const modal = screen.queryByTestId("modal-iniciar-votacao");
        expect(modal).toBeNull();
    })
})