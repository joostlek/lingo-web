<template>
    <div>
        <WordInput :preset="round.word" @submit="submit" />
        <div v-if="round.turns !== null">
            <div v-for="(turn, idx) in round.turns" :key="idx">
                <Turn :turn="turn" />
            </div>
        </div>
    </div>
</template>

<script>
    import WordInput from '@/components/WordInput'
    import Turn from '@/components/Turn'
    export default {
        name: 'RoundView',
        components: { Turn, WordInput },
        props: {
            round: {
                required: true,
                type: Object,
            }
        },
        methods: {
            submit(event) {
                this.$emit('submit', {guess: event, roundId: this.round.roundId});
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
