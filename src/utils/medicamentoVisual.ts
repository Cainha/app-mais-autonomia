export type TurnoVisual = {
  cor: string;
  icone: 'sunrise' | 'sun' | 'cloud' | 'moon';
};

export function getTurnoVisual(horario: string): TurnoVisual {
  // Espera horario no formato 'HH:mm'
  const [h] = horario.split(':').map(Number);
  if (h >= 5 && h <= 10) {
    return { cor: '#e573a7', icone: 'sunrise' }; // Rosa
  } else if (h >= 11 && h <= 15) {
    return { cor: '#ffe066', icone: 'sun' }; // Amarelo
  } else if (h >= 16 && h <= 20) {
    return { cor: '#ffb347', icone: 'cloud' }; // Laranja
  } else {
    return { cor: '#a084e8', icone: 'moon' }; // Roxo
  }
} 