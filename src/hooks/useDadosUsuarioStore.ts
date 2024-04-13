import { create } from 'zustand'

interface DadosUsuarioState{
    token: string;
    setToken: (token: string) => void;
    admin: boolean;
    setAdmin: (admin: boolean) => void;
    setDadosUsuario:(dados: AutenticacaoRespostaDados) => void
}
export const useDadosUsuarioStore = create<DadosUsuarioState>(set => ({
  token: "",
  setToken: (token: string) => set({ token }),
  admin: false,
  setAdmin: (admin: boolean) => set({ admin }),
  setDadosUsuario: (dados: AutenticacaoRespostaDados) => set({ token: dados.token, admin: dados.admin })
}))