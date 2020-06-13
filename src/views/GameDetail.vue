<template>
    <div>
        <h3>Game</h3>
        <div v-if="gameState.game != null">
            <h6>GameID: {{game.gameId}}</h6>
            <RoundSelector v-if="rounds != null" :rounds="rounds" v-model="selectedRound" @submit="newRound"></RoundSelector>
            <RoundView v-if="selectedRound" :round="getSelectedRound" @submit="onGuess"/>
        </div>
    </div>
</template>

<script>
    import RoundSelector from '@/components/RoundSelector'
    import RoundView from '@/components/RoundView'
    export default {
        name: 'GameDetail',
        components: { RoundView, RoundSelector },
        data: () => ({
            gameState: {
                game: null,
                loading: false,
                error: null,
            },
            roundsState: {
                rounds: null,
                loading: false,
                error: null,
            },
            selectedRound: '',
        }),
        methods: {
            async getGame() {
                const { data } = await this.$api.get(`/games/${this.gameId}`)
                this.gameState.game = data;
            },
            async getRounds() {
                const { data } = await this.$api.get(`/games/${this.gameId}/rounds`)
                data.forEach((round) => {
                    round.turns = null
                });
                if (data.length !== 0) {
                    this.selectedRound = data[data.length - 1].roundId;
                }
                this.roundsState.rounds = data;
            },
            async getTurnsForRoundId(roundId) {
                const round = this.getRoundById(roundId);
                if (round.turns === null) {
                    const { data } = await this.$api.get(`/games/${this.gameId}/rounds/${roundId}/turns`);
                    round.turns = data.sort((nodeA, nodeB) => nodeB.count - nodeA.count);
                }
            },
            async doGuess(roundId, guess) {
                const { data } = await this.$api.post(`/games/${this.gameId}/rounds/${roundId}/turns`, {guess})
                // let roundData = await this.$api.get(`/games/${this.gameId}/rounds/${roundId}`).data;
                const round = this.getRoundById(roundId);
                // const index = this.roundsState.rounds.indexOf(round);
                round.turns = [data, ...round.turns];
                // roundData = {...roundData, turns: round.turns};
                // this.roundsState.rounds[index] = roundData;
            },
            getRoundById(roundId) {
                return this.rounds.find((round) => round.roundId === roundId)
            },
            async onGuess(event) {
                await this.doGuess(event.roundId, event.guess);
            },
            async newRound() {
                const { data } = await this.$api.post(`/games/${this.gameId}/rounds`);
                data.turns = [];
                this.roundsState.rounds.push(data);
                this.selectedRound = data.roundId;
            }
        },
        computed: {
            game() {
                return this.gameState.game;
            },
            rounds() {
                return this.roundsState.rounds;
            },
            gameId() {
                return this.$route.params.gameId;
            },
            getSelectedRound() {
                if (this.rounds == null) return null;
                return this.getRoundById(this.selectedRound)
            },
        },
        watch: {
            selectedRound(newRoundId) {
                this.getTurnsForRoundId(newRoundId)
                .then(() => {

                });
            },
        },
        async created() {
            await this.getGame();
            await this.getRounds();
        },
    }
</script>

<style scoped>

</style>
