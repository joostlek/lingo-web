<template>
    <div v-if="!input">
        <div :class="['character', state]"><slot/></div>
    </div>
    <div v-else>
        <div :class="['character', focused ? 'focus' : '']" ref="input"><input type="text" @focusin="focusIn" @focusout="focusOut" v-model="internalValue" @input="update"></div>
    </div>
</template>

<script>
    export default {
        name: 'Character',
        props: {
            state: {
                type: String,
                default: '',
            },
            input: {
                type: Boolean,
                default: false,
            },
            value: {
                type: String,
                default: ' '
            }
        },
        data() {
            return {
                internalValue: this.value,
                focused: false,
            }
        },
        methods: {
            update() {
                this.$emit('input', this.internalValue);
            },
            focusIn() {
                this.focused = true;
            },
            focusOut() {
                this.focused = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .character {
        font-size: 40px;
        padding: 32px;
        box-shadow: 0 0 20px 0 rgba(124, 124, 124, 0.2);
        display: inline-block;
        transition: 300ms;
        border-radius: 8px;
        text-transform: uppercase;

        input {
            line-height: 40px;
            border: none;
            font-size: 40px;
            width: 2rem;
            outline: none;
            text-transform: uppercase;
            transition: 300ms;
        }

        &.correct {
            background-color: var(--correct);
            color: var(--correct-text);
            box-shadow: 0 0 20px 0 var(--correct-shade);
        }

        &.present {
            background-color: var(--present);
            color: var(--present-text);
            box-shadow: 0 0 20px 0 var(--present-shade);
        }

        &.invalid {
            background-color: var(--invalid);
            color: var(--invalid-text);
            box-shadow: 0 0 20px 0 var(--invalid-shade);
        }

        &.focus {
            transition: 300ms;
            background-color: var(--lingo-2);
            color: var(--lingo-9);
            outline: none;
            padding: 29px;
            border: 3px solid var(--lingo-10);
            box-shadow: 0 0 20px 0 var(--lingo-4);
            input {
                background-color: transparent;
            }
        }
    }
</style>
