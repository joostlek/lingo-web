<template>
    <div>
        <h3>Games</h3>
        <select v-model="chosenDictionaryId">
            <option v-for="(dictionary, idx) in dictionaries" :key="idx" :value="dictionary.dictionaryId">{{dictionary.language}}</option>
        </select>
        <input type="radio" id="5" name="wordlength" value="5" v-model="wordLength">
        <label for="5">5</label>
        <input type="radio" id="6" name="wordlength" value="6" v-model="wordLength">
        <label for="6">6</label>
        <input type="radio" id="7" name="wordlength" value="7" v-model="wordLength">
        <label for="7">7</label>
        <button @click="startNewGame">New game</button>
        <div class="table-container">
            <div class="header">Created at</div>
            <div class="header">Word length</div>
            <div class="header"></div>
            <template v-for="(game, idx) in games">
                <div :key="idx + 'language'">{{game.createdAt}}</div>
                <div :key="idx + 'size'">{{game.wordLength}}</div>
                <div class="clickable" :key="idx + 'action'" @click="() => goToGameDetail(game.gameId)">Go</div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Games',
        data: () => ({
            games: [],
            loading: false,
            error: null,
            dictionaries: [],
            chosenDictionaryId: '',
            wordLength: '5',
        }),
        methods: {
            async getGames() {
                const { data } = await this.$api.get("/games");
                this.games = data;
            },
            async getDictionaries () {
                const { data } = await this.$api.get("/dictionaries");
                this.dictionaries = data;
            },
            goToGameDetail(gameId) {
                this.$router.push({name: 'GameDetail', params: {gameId}})
            },
            async startNewGame() {
                const { data } = await this.$api.post("/games", {wordLength: parseInt(this.wordLength), chosenDictionaryId: this.chosenDictionaryId})
                this.games = [data, ...this.games];
            }
        },
        async created() {
            await this.getGames();
            await this.getDictionaries();
        }
    }
</script>

<style lang="scss" scoped>
    .table-container {
        max-width: 600px;
        display: grid;
        grid-template-rows: 32px;
        grid-template-columns: 1fr 100px 32px;
        align-items: stretch;

    .header {
        font-weight: bold;
        font-size: 12px;
        text-transform: uppercase;
    }

    div, span {
        line-height: 32px;
        height: 32px;
    }

    a {
        font-size: 24px;
        height: 28px;
        width: 28px;
    }
    }

</style>
