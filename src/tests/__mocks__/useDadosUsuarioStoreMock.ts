import * as useDadosUsuarioStore from "../../hooks/useDadosUsuarioStore"


export const useDadosUsuarioStoreMock = ()=>{
    jest.spyOn(useDadosUsuarioStore, 'useDadosUsuarioStore').mockReturnValue({
        setDadosUsuario: jest.fn(),
        admin: true,
        id: 1,
        nome: "Saulo",
        sobrenome: "Silva",
    });
}