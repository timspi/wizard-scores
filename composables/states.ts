import { Player, Round } from "~~/models";

export const usePlayers = () => useState<Player[]>('players', () => JSON.parse(localStorage.getItem('players') || '[]'));
export const useRounds = () => useState<Round[]>('rounds', () => JSON.parse(localStorage.getItem('rounds') || '[]'));
