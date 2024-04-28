import * as useTokenLocalStorage from "../../hooks/useTokenLocalStorage"


export const useTokenLocalStorageMock = (jestfn: jest.Mock<any, any, any>)  => {
    
    jest.spyOn(useTokenLocalStorage, 'useTokenLocalStorage').mockReturnValue({
        obterTokenDoLocalStorage: jestfn.mockReturnValue("tokenValido"),
        inserirTokenNoLocalStorage: jest.fn(),
        removerTokenDoLocalStorage: jest.fn()
    });
}