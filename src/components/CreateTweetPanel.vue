<template>
    <form class="create-tweet-panel" @submit.prevent="createNewTweet"
          :class="{ '--exceeded': newTweetCharacterCount > 180 }">
        <label for="newTweet"><strong>New Tweet</strong> ({{ newTweetCharacterCount }}/180)</label>
        <textarea id="newTweet" rows="5" v-model="state.newTweetContent"/>

        <div class="create-tweet-panel__submit">
            <div class="create-tweet-type">
                <label for="newTweetType"><strong>Type: </strong></label>
                <select id="newTweetType" v-model="state.selectedTweetType">
                    <option :value="option.value" v-for="(option, index) in state.tweetTypes" :key="index">
                        {{ option.name }}
                    </option>
                </select>
            </div>

            <button>
                Tweet It!
            </button>
        </div>
    </form>
</template>

<script>
    import {reactive, computed} from 'vue';

    export default {
        name: "CreateTweetPanel",

        // Vue 3 Composition API - new in Vue 3
        // 'context' is usually shortened to 'ctx'
        setup(props, context) {
            const state = reactive({
                newTweetContent: '',
                selectedTweetType: 'instant',
                tweetTypes: [
                    {value: 'draft', name: 'Draft'},
                    {value: 'instant', name: 'Instant Tweet'}
                ]
            })

            const newTweetCharacterCount = computed(() => state.newTweetContent.length);

            function createNewTweet() {
                if (state.newTweetContent && state.selectedTweetType !== 'draft' && this.newTweetCharacterCount <= 180) {
                    context.emit('add-tweet', state.newTweetContent);
                    state.newTweetContent = '';
                }
            }

            return {
                state,
                newTweetCharacterCount,
                createNewTweet
            }
        }
    };
</script>

<style lang="scss" scoped>
    .create-tweet-panel {
        margin-top: 20px;
        padding: 20px 0;
        display: flex;
        flex-direction: column;

        textarea {
            border: 1px solid #DFE3E8;
            border-radius: 5px;
            resize: none;
        }

        .create-tweet-panel__submit {
            display: flex;
            justify-content: space-between;

            .create-tweet-type {
                padding: 10px 0;
            }

            button {
                padding: 5px 20px;
                margin: auto 0;
                border-radius: 5px;
                border: none;
                background-color: #1da1f2;
                color: white;
                font-weight: bold;
                cursor: pointer;
            }
        }

        &.--exceeded {
            color: red;
            border-color: red;

            .create-tweet-panel__submit {
                button {
                    background-color: red;
                    color: white;
                }
            }
        }
    }
</style>