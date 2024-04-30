import * as useTokenLocalStorage from "../../hooks/useTokenLocalStorage"


export const useTokenLocalStorageMock = (obterTokenMock: jest.Mock<any, any, any>, inserirTokenMock: jest.Mock<any, any, any>, removerTokenMock: jest.Mock<any, any, any>)  => {
    
    jest.spyOn(useTokenLocalStorage, 'useTokenLocalStorage').mockReturnValue({
        obterTokenDoLocalStorage: obterTokenMock.mockReturnValue("tokenValido"),
        inserirTokenNoLocalStorage: inserirTokenMock,
        removerTokenDoLocalStorage: removerTokenMock
    });
}