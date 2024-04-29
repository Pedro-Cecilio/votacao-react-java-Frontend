import * as useInserirVoto from "../../hooks/useInserirVoto"
import { respostaPautaDadosMock } from "./models/respostaPautaDadosMocks"

export const useInserirVotoMock = (inserirVotoInternoMock: jest.Mock, inserirVotoExternoMock: jest.Mock)=>{
    
    const respostaVotacao =  respostaPautaDadosMock();
    jest.spyOn(useInserirVoto, "useInserirVoto").mockReturnValue({
        inserirVotoInterno: inserirVotoInternoMock.mockResolvedValue(respostaVotacao),
        inserirVotoExterno: inserirVotoExternoMock
    });
}