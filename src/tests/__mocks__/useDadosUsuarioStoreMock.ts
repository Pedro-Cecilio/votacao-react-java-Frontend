import * as useDadosUsuarioStore from "../../hooks/useDadosUsuarioStore"


export const useDadosUsuarioStoreMock = ()=>{
    const useDadosUsuarioAdminPauta = () => {
        jest.spyOn(useDadosUsuarioStore, 'useDadosUsuarioStore').mockReturnValue({
            setDadosUsuario: jest.fn(),
            admin: true,
            id: 1,
            nome: "Saulo",
            sobrenome: "Silva",
        });
    }
    const useDadosUsuarioNaoAdminPauta = () => {
        jest.spyOn(useDadosUsuarioStore, 'useDadosUsuarioStore').mockReturnValue({
            setDadosUsuario: jest.fn(),
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