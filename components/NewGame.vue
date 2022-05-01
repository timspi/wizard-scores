<template>
    <div>
        <div>
            <h2 class="text-lg text-center">Add players</h2>

            <textarea class="block w-full border-2 border-slate-500 rounded p-2 my-4 text-base outline-none focus:border-slate-400 bg-slate-800" rows="8" v-model="playerStr" placeholder="Add one player per line"></textarea>
            <button @click="start()" class="block mx-auto font-bold py-2 px-4 rounded bg-slate-500">Start</button>
        </div>

        <!-- <div v-else>
            <h2 class="text-lg text-center">Who starts bidding?</h2>

            <button v-for="p in players" :key="p.name" @click="selectPlayer(p)" class="block mx-auto my-2 font-bold py-2 px-4 rounded bg-slate-500">{{ p.name }}</button>
        </div> -->
    </div>
</template>

<script setup>
import { usePlayers } from '~~/composables/states';

// const isSetup = ref(true);
const players = usePlayers();
const rounds = useRounds();
const playerStr = ref(players.value.map(p => p.name).join('\n'));

const emit = defineEmits([ 'start' ]);

const start = () => {
    let counter = 1;
    players.value = playerStr.value.trim().split('\n').map(name => ({ name: name.trim(), id: counter++ }));

    localStorage.setItem('players', JSON.stringify(players.value));
    localStorage.removeItem('rounds');
    rounds.value = [];

    emit('start');
    // isSetup.value = false;
};

// const selectPlayer = player => {
// };
</script>