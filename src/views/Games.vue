<template>
    <div>
        <h3>Games</h3>
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
        }),
        methods: {
            async getGames() {
                const { data } = await this.$api.get("/games");
                this.games = data;
            },
            goToGameDetail(gameId) {
                this.$router.push({name: 'GameDetail', params: {gameId}})
            }
        },
        async created() {
            await this.getGames();
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
