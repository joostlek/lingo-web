<template>
    <div>
        <h3>Words</h3>
        <input type="text" v-model="newWord"><button @click="addWord">Add word</button>
        <div class="table-container">
            <div class="header">Word</div>
            <template v-for="(word, idx) in words">
                <div :key="idx + 'word'">{{word.word}}</div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DictionaryDetail',
        data: () => ({
            dictionary: null,
            loading: false,
            error: null,
            words: [],
            newWord: '',
        }),
        methods: {
            async getDictionary() {
                const dictionaryId = this.$route.params.dictionaryId;
                const { data } = await this.$api.get(`/dictionaries/${dictionaryId}`)
            },
            async getWords() {
                const dictionaryId = this.$route.params.dictionaryId;
                const { data } = await this.$api.get(`/dictionaries/${dictionaryId}/words`)
                this.words = data;
            },
            async addWord() {
                const dictionaryId = this.$route.params.dictionaryId;
                const { data } = await this.$api.post(`/dictionaries/${dictionaryId}/words`, {word: this.newWord})
                this.words = [...this.words, data]
            }
        },
        async created() {
            await this.getWords();
        }
    }
</script>

<style lang="scss" scoped>
    .table-container {
        max-width: 600px;
        display: grid;
        grid-template-rows: 32px;
        grid-template-columns: 1fr;
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
