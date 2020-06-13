<template>
    <div class="round-container">
        <div v-for="(round, idx) in sortedRounds" :key="idx" :class="['round', 'clickable', round.roundId === value ? 'selected' : '']" @click="() => update(round.roundId)">
            Round #{{round.count}}
        </div>
        <div v-if="rounds.length < 5" class="round clickable center" @click="newRound">
            <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve">
<g>
	<g>
		<path d="M256,0C114.833,0,0,114.833,0,256s114.833,256,256,256s256-114.853,256-256S397.167,0,256,0z M256,472.341    c-119.275,0-216.341-97.046-216.341-216.341S136.725,39.659,256,39.659S472.341,136.705,472.341,256S375.295,472.341,256,472.341z    "/>
	</g>
</g>
                <g>
	<g>
		<path d="M355.148,234.386H275.83v-79.318c0-10.946-8.864-19.83-19.83-19.83s-19.83,8.884-19.83,19.83v79.318h-79.318    c-10.966,0-19.83,8.884-19.83,19.83s8.864,19.83,19.83,19.83h79.318v79.318c0,10.946,8.864,19.83,19.83,19.83    s19.83-8.884,19.83-19.83v-79.318h79.318c10.966,0,19.83-8.884,19.83-19.83S366.114,234.386,355.148,234.386z"/>
	</g>
</g>

</svg>
                </div>
            New round
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
            },
            newRound() {
                this.$emit('submit');
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
            .icon {
                height: 40px;
                width: 40px;
                margin-left: auto;
                margin-right: auto;
                fill: #8d8f91;
                margin-bottom: 4px;
            }
        }
    }
</style>
