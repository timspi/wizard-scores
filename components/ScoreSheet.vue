<template>
    <div>
        <div v-if="view == 'bids'">
            <h2 class="text-lg pb-2 text-center">
                Round {{ rounds[roundIndex].roundNumber }}: <span class="font-bold">Bids</span>
            </h2>
            <p class="font-light text-center">
                {{ getPlayer(true) }} has to give {{ rounds[roundIndex].roundNumber }} cards, {{ getPlayer() }} starts with bidding.
            </p>

            <PlayerInputs :round="rounds[roundIndex]" type="bids" />

            <button @click="view = 'wins'" :disabled="isDisabled()"
                class="block mx-auto font-bold py-2 px-4 rounded bg-slate-500 disabled:bg-slate-300">
                Continue
            </button>
        </div>

        <div v-if="view == 'wins'">
            <h2 class="text-lg pb-2 text-center">
                Round {{ rounds[roundIndex].roundNumber }}: <span class="font-bold">Wins</span>
            </h2>
            <p class="font-light text-center">
                {{ getPlayer() }} starts this round.
            </p>

            <PlayerInputs :round="rounds[roundIndex]" type="wins" />

            <button @click="saveRound()" :disabled="isDisabled()"
                class="block mx-auto font-bold py-2 px-4 rounded bg-slate-500 disabled:bg-slate-300">
                Continue
            </button>
        </div>

        <div v-if="view == 'scores'">
            <h2 class="text-lg text-center">Scoresheet</h2>

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
                                {{ rounds.reduce((val, r) => r.players[p.id].score + val, 0) }}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <button @click="nextRound()" class="block mx-auto my-2 font-bold py-2 px-4 rounded bg-slate-500">
                Next round
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePlayers, useRounds } from '~~/composables/states';
import { Round } from '~~/models';

const view = ref('scores');
const roundIndex = ref(-1);
const players = usePlayers();
const rounds = useRounds();

onBeforeMount(() => {
    if (rounds.value.length > 0) {
        roundIndex.value = rounds.value.length - 1;
    }
})

const nextRound = () => {
    roundIndex.value++;
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
    rounds.value[roundIndex.value] = round;
    view.value = 'bids';
};

const saveRound = () => {
    const playerData = rounds.value[roundIndex.value].players;
    for (let p of players.value) {
        const diff = Math.abs(playerData[p.id].bids - playerData[p.id].wins);
        playerData[p.id].score = diff == 0 ? 20 + playerData[p.id].bids * 10 : diff * -10;
    }
    localStorage.setItem('rounds', JSON.stringify(rounds.value));
    view.value = 'scores';
};

const getPlayer = (prev = false) => {
    const offset = prev ? players.value.length - 1 : 0;
    return players.value[(roundIndex.value + offset) % players.value.length].name;
};

const isDisabled = () => {
    const round = rounds.value[roundIndex.value];
    const sum = Object.values(round.players).reduce((val, p) => p[view.value] + val, 0);

    if (view.value == 'bids' && sum == round.roundNumber) return true;
    if (view.value == 'wins' && sum != round.roundNumber) return true;

    return false;
}
</script>