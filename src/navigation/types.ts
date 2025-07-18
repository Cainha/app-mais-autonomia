// src/navigation/types.ts

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  AdicionarMedicamento: undefined;
};

// 👇 ATUALIZE ESTA PARTE
export type BottomTabParamList = {
  Home: undefined;         // Nome da rota para a tela inicial
  Relatorio: undefined;    // Nome da rota para o relatório
  Arquivados: undefined;   // Nome da rota para os arquivados
};