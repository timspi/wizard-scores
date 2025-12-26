export interface Settings {
    validateBidsNotWins?: boolean;
    rotateStartingPlayer?: boolean;
}

export interface Round {
    roundNumber: number;
    players: {
        [id: number]: PlayerRound;
    }
}

export interface PlayerRound {
    bids?: number;
    wins?: number;
    score?: number;
}

export interface Player {
    id: number;
    name: string;
}