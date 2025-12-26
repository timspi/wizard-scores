import type { Player, Round, Settings } from "~/models";

export const usePlayers = () => useState<Player[]>('players', () => JSON.parse(localStorage.getItem('players') || '[]'));
export const useRounds = () => useState<Round[]>('rounds', () => JSON.parse(localStorage.getItem('rounds') || '[]'));
export const useSettings = () => useState<Settings>('settings', () => JSON.parse(localStorage.getItem('settings') || '{}'));
