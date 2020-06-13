<template>
    <div class="round-container">
        <div v-for="(round, idx) in sortedRounds" :key="idx" :class="['round', 'clickable', round.roundId === value ? 'selected' : '']" @click="() => update(round.roundId)">
            Round #{{round.count}}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'RoundSelector',
        props: {
            value: {
                type: String,
                required: true,
            },
            rounds: {
                type: Array,
                required: true,
            }
        },
        data() {
            return {
                internalValue: this.value
            }
        },
        methods: {
            update(roundId) {
                this.internalValue = roundId;
                this.$emit('input', this.internalValue);
            }
        },
        computed: {
            sortedRounds() {
                const list = [...this.rounds];
                return list.sort((roundA, roundB) => roundA.count - roundB.count);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .round-container {
        padding-top: 16px;
        padding-bottom: 16px;
        display: flex;
        .round {
            width: 18%;
            margin-left: 1%;
            margin-right: 1%;
            height: 100px;
            border-radius: 8px;
            padding: 16px;
            box-shadow: 0 0 20px 0 rgba(124, 124, 124, 0.2);
            transition: box-shadow 300ms;
            &.selected {
                box-shadow: 0 0 20px 0 rgba(124, 124, 124, 0.3);
                transition: box-shadow 300ms;
            }
            &:hover {
                box-shadow: 0 0 20px 0 rgba(124, 124, 124, 0.4);
                transition: box-shadow 300ms;
            }
        }
    }
</style>
