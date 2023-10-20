<template>
    <div class="py-4">
        <div v-for="p in players" :key="p.id" class="flex items-center py-2 -mx-4 px-4 odd:bg-slate-800">
            <span class="flex-1">{{ p.name }}</span>
            <button @click="add(p, -1)" class="w-8 h-8 bg-slate-600 rounded-full text-xl font-black">-</button>
            <span class="w-12 text-center">{{ round.players[p.id][props.type] + (props.type === 'wins' ? ' / ' +
                round.players[p.id]['bids'] : '') }}</span>
            <button @click="add(p, 1)" class="w-8 h-8 bg-slate-600 rounded-full text-xl font-black">+</button>
        </div>

        <div class="flex py-2">
            <span class="flex-1"></span>
            <span class="w-28 text-center">{{ getSum() }} / {{ props.round.roundNumber }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePlayers } from '~~/composables/states';
import { Player, Round } from '~~/models';

const players = usePlayers();

const props = defineProps<{
    type: 'bids' | 'wins',
    round: Round
}>();

const add = (p: Player, inc: number) => {
    props.round.players[p.id][props.type] += inc;
};

const getSum = () => {
    return Object.values(props.round.players).reduce((val, p) => p[props.type] + val, 0);
}

</script>