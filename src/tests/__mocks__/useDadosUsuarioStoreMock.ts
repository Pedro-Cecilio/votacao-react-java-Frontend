import * as useDadosUsuarioStore from "../../hooks/useDadosUsuarioStore"


export const useDadosUsuarioStoreMock = (admin:boolean)=>{
    jest.spyOn(useDadosUsuarioStore, 'useDadosUsuarioStore').mockReturnValue({
        setDadosUsuario: jest.fn(),
        admin: admin,
        id: 1,
        nome: "Saulo",
        sobrenome: "Silva",
    });
}