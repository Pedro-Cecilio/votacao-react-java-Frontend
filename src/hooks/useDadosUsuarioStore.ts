import { create } from 'zustand'

interface DadosUsuarioState {
  id: number | null;
  nome: string;
  sobrenome: string;
  admin: boolean;
  setId: (id: number | null) => void;
  setNome: (nome: string) => void;
  setSobrenome: (sobrenome: string) => void;
  setAdmin: (admin: boolean) => void;
  setDadosUsuario: (id: number, nome: string, sobrenome: string, admin: boolean) => void
}
export const useDadosUsuarioStore = create<DadosUsuarioState>(set => ({
  id: null,
  nome: "",
  sobrenome: "",
  admin: false,

  setId: (id: number | null) => set({ id }),
  setNome: (nome: string) => set({ nome }),
  setSobrenome: (sobrenome: string) => set({ sobrenome }),
  setAdmin: (admin: boolean) => set({ admin }),

  setDadosUsuario: (id: number | null, nome: string, sobrenome: string, admin: boolean) => set({ id, nome, sobrenome, admin })
}));

