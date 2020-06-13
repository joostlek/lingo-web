<template>
    <div>
        <h3>Dictionaries</h3>
        <p>These are the available dictionaries. You can create custom ones!</p>
        <input type="text" v-model="newDictionary"><button @click="addDictionary">Add dictionary</button>
        <div class="table-container">
            <div class="header">Language</div>
            <div class="header">Size</div>
            <div class="header"></div>
            <template v-for="(dictionary, idx) in dictionaries">
                <div :key="idx + 'language'">{{dictionary.language}}</div>
                <div :key="idx + 'size'">{{dictionary.size}}</div>
                <div :key="idx + 'action'" @click="() => {goToDictionaryDetail(dictionary.dictionaryId)}" class="clickable">Go</div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Dictionaries',
        data: () => ({
            dictionaries: [],
            loading: false,
            error: null,
            newDictionary: ''
        }),
        methods: {
            async getDictionaries () {
                const { data } = await this.$api.get("/dictionaries");
                this.dictionaries = data;
            },
            goToDictionaryDetail(dictionaryId) {
                this.$router.push({name: 'DictionaryDetail', params: {dictionaryId}})
            },
            async addDictionary() {
                const { data } = await this.$api.post("/dictionaries", {language: this.newDictionary});
                this.dictionaries = [...this.dictionaries, data];
                this.newDictionary = '';
            }
        },
        async created() {
            await this.getDictionaries();
        }
    }
</script>

<style lang="scss" scoped>
    .table-container {
        max-width: 600px;
        display: grid;
        grid-template-rows: 32px;
        grid-template-columns: 1fr 1fr 32px;
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
