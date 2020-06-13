<template>
    <div class="container">
        <Character v-for="(character, idx) in characters" :key="idx" v-model="characters[idx]" input></Character>
        <button @click="submit">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 448.011 448.011" xml:space="preserve">
<g>
	<g>
		<path d="M438.731,209.463l-416-192c-6.624-3.008-14.528-1.216-19.136,4.48c-4.64,5.696-4.8,13.792-0.384,19.648l136.8,182.4    l-136.8,182.4c-4.416,5.856-4.256,13.984,0.352,19.648c3.104,3.872,7.744,5.952,12.448,5.952c2.272,0,4.544-0.48,6.688-1.472    l416-192c5.696-2.624,9.312-8.288,9.312-14.528S444.395,212.087,438.731,209.463z"/>
	</g>
</g>
</svg></button>
    </div>
</template>

<script>
    import Character from '@/components/Character'
    export default {
        name: 'WordInput',
        components: { Character },
        props: {
            preset: {
                type: String,
                required: true,
            }
        },
        data: () => ({
            characters: {}
        }),
        created() {
            this.extractCharacters();
        },
        methods: {
            extractCharacters() {
                for (let x = 0, c = ''; c = this.preset.charAt(x); x++) {
                    if (c === ' ') {
                        c = '';
                    }
                    this.characters[x.toString()] = c;
                }
            },
            concatCharacters() {
                let res = '';
                for (let charactersKey in this.characters) {
                    if (this.characters.hasOwnProperty(charactersKey)) {
                        res += this.characters[charactersKey];
                    }
                }
                return res;
            },
            submit() {
                this.$emit('submit', this.concatCharacters());
            }
        }
    }
</script>

<style lang="scss" scoped>

    .container {
        margin-top: 32px;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        margin-bottom: 64px;
    }

    button {
        padding: 32px;
        box-shadow: 0 0 20px 0 rgba(124, 124, 124, 0.2);
        display: inline-block;
        transition: 300ms;
        border-radius: 8px;
        border: none;
        background-color: var(--lingo);
        cursor: pointer;

        &:hover {
            box-shadow: 0 0 20px 0 rgba(124, 124, 124, 0.4);
        }

        svg {
            height: 40px;
            fill: var(--lingo-dark);
        }
    }
</style>
