<template>
    <div>
        <div v-if="view == 'bids'">
            <h2 class="text-lg pb-2 text-center">
                Round {{ currentRound.roundNumber }}: <span class="font-bold">Bids</span>
            </h2>
            <p class="font-light text-center">
                {{ getPlayer(true) }} has to give {{ currentRound.roundNumber }} {{ currentRound.roundNumber ===
                    1 ? 'card' : 'cards' }}, {{ getPlayer() }} starts with bidding.
            </p>

            <PlayerInputs :round="currentRound" type="bids" />

            <div class="flex justify-center gap-3">
                <div>
                    <button @click="cancelRound()"
                        class="block mx-auto font-bold py-2 px-4 rounded bg-slate-500 disabled:bg-slate-300">
                        Cancel
                    </button>
                </div>
                <div>
                    <button @click="view = 'wins'" :disabled="isDisabled()"
                        class="block mx-auto font-bold py-2 px-4 rounded bg-slate-500 disabled:bg-slate-300">
                        Continue
                    </button>
                </div>
            </div>
        </div>

        <div v-if="view == 'wins'">
            <h2 class="text-lg pb-2 text-center">
                Round {{ currentRound.roundNumber }}: <span class="font-bold">Wins</span>
            </h2>
            <p class="font-light text-center">
                {{ getPlayer() }} starts this round.
            </p>

            <PlayerInputs :round="currentRound" type="wins" />

            <div class="flex justify-center gap-3">
                <button @click="view = 'bids'" class="font-bold py-2 px-4 rounded bg-slate-500 disabled:bg-slate-300">
                    Back
                </button>
                <button @click="saveRound()" :disabled="isDisabled()"
                    class="font-bold py-2 px-4 rounded bg-slate-500 disabled:bg-slate-300">
                    Continue
                </button>
            </div>
        </div>

        <div v-if="view == 'scores'">
            <h2 class="text-lg text-center">Ranking</h2>

            <div class="py-4">
                <!-- <ol>
                    <li v-for="(p, ind) in sortedPlayerScores()">
                        {{ 1 + ind }}) {{ p.name }}: {{ p.score }}
                    </li>
                </ol> -->
                <table class="table-auto w-full">
                    <thead>
                        <tr>
                            <th v-for="l in ['', 'Player', 'Score']"
                                class="text-center py-1 px-2 border border-b-2 border-slate-700">
                                {{ l }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="p in getRanking()" :key="p.name">
                            <td class="text-center py-1 px-2 border border-slate-700">
                                {{ p.rank }}
                            </td>
                            <td class="py-1 px-2 border border-slate-700">
                                {{ p.name }}
                            </td>
                            <td class="py-1 px-2 border border-slate-700">
                                {{ p.score }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <button @click="nextRound()" class="block mx-auto my-2 font-bold py-2 px-4 rounded bg-slate-500">
                Next round
            </button>

            <h2 class="mt-10 text-lg text-center">Scoresheet</h2>

            <div class="overflow-x-auto py-4">
                <table class="table-auto w-full">
                    <thead>
                        <tr>
                            <th class="text-center py-1 px-2 border border-b-2 border-slate-700">
                                #
                            </th>
                            <th v-for="p in players" :key="p.id" class="py-1 px-2 border border-b-2 border-slate-700">
                                {{ p.name }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="r in rounds" :key="r.roundNumber">
                            <td class="text-center py-1 px-2 border border-slate-700">
                                {{ r.roundNumber }}
                            </td>
                            <td v-for="p in players" :key="p.id" class="py-1 px-2 border border-slate-700">
                                {{ r.players[p.id].score }}
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td class="text-center py-1 px-2 border border-t-2 border-slate-700">∑</td>
                            <td v-for="p in players" :key="p.id" class="py-1 px-2 border border-t-2 border-slate-700">
                                {{ getPlayerScore(p) }}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { usePlayers, useRounds } from '~~/composables/states';
import { Player, Round } from '~~/models';

const view = ref('scores');
const roundIndex = ref(-1);
const currentRound = ref<Partial<Round>>({});
const players = usePlayers();
const rounds = useRounds();

onBeforeMount(() => {
    if (rounds.value.length > 0) {
        roundIndex.value = rounds.value.length - 1;
    }
})

const nextRound = () => {
    roundIndex.value++;
    if (!currentRound.value.players) {
        const round: Round = {
            roundNumber: roundIndex.value + 1,
            players: {}
        };
        for (let p of players.value) {
            round.players[p.id] = {
                bids: 0,
                wins: 0
            };
        }
        currentRound.value = round;
    }
    view.value = 'bids';
};

const saveRound = () => {
    rounds.value[roundIndex.value] = currentRound.value as Round;
    currentRound.value = {};

    const playerData = rounds.value[roundIndex.value].players;
    for (let p of players.value) {
        const diff = Math.abs(playerData[p.id].bids - playerData[p.id].wins);
        playerData[p.id].score = diff == 0 ? 20 + playerData[p.id].bids * 10 : diff * -10;
    }
    localStorage.setItem('rounds', JSON.stringify(rounds.value));
    view.value = 'scores';
};

const cancelRound = () => {
    roundIndex.value--;
    view.value = 'scores';
};

const getPlayer = (prev = false) => {
    const offset = prev ? players.value.length - 1 : 0;
    return players.value[(roundIndex.value + offset) % players.value.length].name;
};

const getPlayerScore = (player: Player) => {
    return rounds.value.reduce((val, r) => r.players[player.id].score + val, 0);
};

const getRanking = () => {
    const scores = players.value.map(p => ({
        rank: 0,
        name: p.name,
        score: getPlayerScore(p)
    }));
    scores.sort((p1, p2) => p2.score - p1.score);

    // Generate ranking based on scores (players with same score get same rank)
    scores[0].rank = 1; // first is always first
    for (let ind = 1; ind < scores.length; ind++) {
        if (scores[ind - 1].score === scores[ind].score) {
            scores[ind].rank = scores[ind - 1].rank; // same rank as successor
        } else {
            scores[ind].rank = ind + 1; // rank based on spot in ranking
        }
    }
    return scores;
}

const isDisabled = () => {
    const round = currentRound.value;
    if (!round.players) return true;

    const sum = Object.values(round.players).reduce((val, p) => p[view.value] + val, 0);

    if (view.value == 'bids' && sum == round.roundNumber) return true;
    if (view.value == 'wins' && sum != round.roundNumber) return true;

    return false;
}
</script>