<template>
    <div class="inline-flex items-center">
        <input type="checkbox" :id="props.name" :name="props.name" v-model="model"
            class="w-5 h-5 rounded border border-slate-300 checked:bg-slate-800 checked:border-slate-800" />
        <label :for="props.name" class="select-none ms-2 text-heading">{{ props.label }}</label>
    </div>
</template>

<script setup lang="ts">
const model = defineModel();
const props = defineProps<{ name: string, label: string }>();
</script>
