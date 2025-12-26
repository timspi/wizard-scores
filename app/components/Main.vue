<template>
    <div>
        <div class="bg-slate-800 flex items-center px-4 py-2 shadow shadow-black">
            <h1 class="flex-1 text-xl">Wizard Scorekeeper</h1>

            <div class="relative">
                <button @click="menuOpen = !menuOpen" class="font-black text-sm px-2 py-1">MENU</button>

                <div v-if="menuOpen" @click="menuOpen = false" class="absolute top-full right-0 bg-slate-800 border-t-2 border-slate-500 shadow shadow-black">
                    <button v-if="isSetup && players.length > 0" class="px-4 py-2 border-t border-t-slate-700 first:border-none" @click="isSetup = false">Continue&nbsp;game</button>
                    <button class="px-4 py-2 border-t border-t-slate-700 first:border-none" @click="isSetup = true">New&nbsp;game</button>
                </div>
            </div>
        </div>

        <div class="p-4">
            <NewGame v-if="isSetup" @start="isSetup = false" />
            <ScoreSheet v-else />
        </div>

    </div>
</template>

<script setup>
const players = usePlayers();

const isSetup = ref(players.value.length == 0);
const menuOpen = ref(false);
</script>