import * as useDadosUsuarioStore from "../../hooks/useDadosUsuarioStore"


export const useDadosUsuarioStoreMock = ()=>{
    const useDadosUsuarioAdminPauta = (setDadosUsuarioMocks: jest.Mock = jest.fn()) => {
        jest.spyOn(useDadosUsuarioStore, 'useDadosUsuarioStore').mockReturnValue({
            setDadosUsuario: setDadosUsuarioMocks,
            admin: true,
            id: 1,
            nome: "Saulo",
            sobrenome: "Silva",
        });
    }
    const useDadosUsuarioNaoAdminPauta = (setDadosUsuarioMocks: jest.Mock = jest.fn()) => {
        jest.spyOn(useDadosUsuarioStore, 'useDadosUsuarioStore').mockReturnValue({
            setDadosUsuario: setDadosUsuarioMocks,
            admin: false,
            id: 2,
            nome: "Paulo",
            sobrenome: "Junior",
        });
    }

    return {
        useDadosUsuarioAdminPauta, 
        useDadosUsuarioNaoAdminPauta
    }
}