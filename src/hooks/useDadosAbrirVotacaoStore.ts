import { create } from 'zustand'

export interface DadosUsuarioState {
  pautaId: number;

  setPautaId: (id: number ) => void;
}
export const useDadosAbrirVotacaoStore = create<DadosUsuarioState>(set => ({
  pautaId: 0,

  setPautaId: (pautaId: number ) => set({ pautaId }),
}));

