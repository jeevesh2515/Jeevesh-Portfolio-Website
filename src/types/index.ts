export type GlowColor = 'gold' | 'cyan' | 'amber' | 'magenta' | 'emerald' | 'violet' | 'crimson';

export interface GlowColorMap {
  color: string;
  shadow: string;
}

export const GLOW_COLORS: Record<GlowColor, GlowColorMap> = {
  gold: { color: '#fbbf24', shadow: '0 0 20px rgba(251, 191, 36, 0.3), 0 0 60px rgba(251, 191, 36, 0.1)' },
  cyan: { color: '#00f0ff', shadow: '0 0 20px rgba(0, 240, 255, 0.3), 0 0 60px rgba(0, 240, 255, 0.1)' },
  amber: { color: '#FF9F1C', shadow: '0 0 20px rgba(255, 159, 28, 0.3), 0 0 60px rgba(255, 159, 28, 0.1)' },
  magenta: { color: '#FF006E', shadow: '0 0 20px rgba(255, 0, 110, 0.3), 0 0 60px rgba(255, 0, 110, 0.1)' },
  emerald: { color: '#00FF88', shadow: '0 0 20px rgba(0, 255, 136, 0.3), 0 0 60px rgba(0, 255, 136, 0.1)' },
  violet: { color: '#9B5DE5', shadow: '0 0 20px rgba(155, 93, 229, 0.3), 0 0 60px rgba(155, 93, 229, 0.1)' },
  crimson: { color: '#E63946', shadow: '0 0 20px rgba(230, 57, 70, 0.3), 0 0 60px rgba(230, 57, 70, 0.1)' },
};

export interface ChatMessage {
  id: string;
  text: string;
  color: 'gold' | 'cyan' | 'green' | 'red' | 'dim' | 'purple' | 'default';
  isUser: boolean;
  timestamp?: number;
}
